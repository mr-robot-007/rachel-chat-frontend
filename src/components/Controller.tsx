import { useState } from "react";
import Title from "./Title";
import RecordMessage from "./RecordMessage";
import axios from "axios";
import {backend_url} from "../constants"

// http://localhost:8000 
// const backend_url = process.env.BACKEND_URL
// const backend_url = "https://rachel-chat-anujgusain1083.replit.app"

function Controller() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  // console.log(messages);

  // in blob url we store url or recorded audio, then pass that to audio src
  // const [blob, setBlob] = useState("");

  // this convert octet data recieved from backedn to required format
  const createBlobUrl = (data: any) => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  };

  const handleStop = async (blobUrl: string) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];

    // Convert blob Url to blob object as it needs to be sent to backend
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct audio to send file
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        // Send form data to API endpoint
        await axios
          .post(`${backend_url}/post-audio`, formData, {
            headers: { "Context-Type": "audio/mpeg" },
            responseType: "arraybuffer",
          })
          .then((res: any) => {
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobUrl(blob);

            // Append to audio
            const rachelMessage = { sender: "rachel", blobUrl: audio.src };
            messagesArr.push(rachelMessage);
            setMessages(messagesArr);

            // Play audio
            setIsLoading(false);
            // audio.play();
          })
          .catch((err) => {
            console.error(err.message);
            setIsLoading(false);
          });
      });
  };

  return (
    <div className="md:h-[900px] h-full fixed md:w-[500px] w-full  md:top-10 overflow-y-hidden md:rounded-lg ">
      <Title setMessages={setMessages} />
      <div className="flex flex-col justify-between md:h-[640px] h-[70%] overflow-y-scroll md:border-black-500 md:border-[0.5px] pb-96 fixed w-full md:w-[500px]">
        {/* Conversation */}
        <div className="mt-5 px-5">
          {messages.map((audio, index) => {
            return (
              <div
                key={index + audio.sender}
                className={
                  "flex flex-col " +
                  (audio.sender == "rachel" && "flex items-end ")
                }
              >
                {/* Sender */}

                <div className="mt-4">
                  <p
                    className={
                      audio.sender == "rachel"
                        ? "text-right mr-2 italic text-green-500"
                        : "ml-2 italic text-blue-500"
                    }
                  >
                    {audio.sender}
                  </p>
                  {/*  Audio Message */}
                  <audio
                    className=""
                    src={audio.blobUrl}
                    controls
                    autoPlay={index == messages.length - 1}
                  />
                </div>
              </div>
            );
          })}
          {messages.length == 0 && !isLoading && (
            <div className="text-center font-light italic mt-10">
              Send rachel a message...
            </div>
          )}
          {isLoading && (
            <div className="text-center font-light italic mt-10 animate-pulse">
              Gimme a few seconds...
            </div>
          )}
        </div>

        {/* Recoder */}
        <div className="fixed bottom-0 md:bottom-10 w-full md:rounded-b-lg md:w-[500px] py-6 text-center bg-gradient-to-r from-sky-500 to-green-500">
          <div className="flex justify-center items-center w-full">
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controller;
