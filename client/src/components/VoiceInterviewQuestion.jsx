import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./SpeechInterview.css";

const VoiceInterviewQuestion = ({
  question,
}) => {

  const [isListening, setIsListening] =
    useState(false);

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const recognitionRef =
    useRef(null);

  // SETUP SPEECH RECOGNITION
  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    // CHECK SUPPORT
    if (!SpeechRecognition) {

      alert(
        "Speech Recognition is not supported in this browser. Use Google Chrome."
      );

      return;
    }

    // CREATE OBJECT
    const recognition =
      new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    // START EVENT
    recognition.onstart = () => {

      console.log("VOICE STARTED");

      setIsListening(true);

      alert(
        "🎤 Voice recording started"
      );
    };

    // RESULT EVENT
    recognition.onresult = (
      event
    ) => {

      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0]
            .transcript + " ";
      }

      console.log(
        "VOICE TEXT:",
        transcript
      );

      setAnswer(transcript);
    };

    // END EVENT
    recognition.onend = () => {

      console.log("VOICE STOPPED");

      setIsListening(false);
    };

    // ERROR EVENT
    recognition.onerror = (
      event
    ) => {

      console.log(
        "VOICE ERROR:",
        event.error
      );

      setIsListening(false);

      alert(
        "Microphone Error: " +
          event.error
      );
    };

    recognitionRef.current =
      recognition;

  }, []);

  // START LISTENING
  const startListening =
    async () => {

      try {

        // ASK MICROPHONE ACCESS
        await navigator.mediaDevices.getUserMedia(
          {
            audio: true,
          }
        );

        // CLEAR OLD ANSWER
        setAnswer("");

        // START
        if (
          recognitionRef.current
        ) {

          recognitionRef.current.start();
        }

      } catch (error) {

        console.log(error);

        alert(
          "Please allow microphone permission."
        );
      }
    };

  // STOP LISTENING
  const stopListening = () => {

    if (
      recognitionRef.current
    ) {

      recognitionRef.current.stop();
    }

    setIsListening(false);
  };

  // CLEAR
  const clearAnswer = () => {

    setAnswer("");

    setFeedback("");
  };

  // FEEDBACK
  const generateFeedback =
    () => {

      if (!answer) {

        setFeedback(
          "Please answer the question first."
        );

        return;
      }

      let result = "";

      if (
        answer.length < 80
      ) {

        result =
          "Answer is too short. Try adding more details.";
      }

      else if (
        answer
          .toLowerCase()
          .includes("project")
      ) {

        result =
          "Good answer. Project explanation is clear.";
      }

      else {

        result =
          "Good communication. Add more technical points.";
      }

      setFeedback(result);
    };

  return (

    <div className="speech-container">

      {/* QUESTION */}
      <div className="question-box">

        <h3>
          Interview Question
        </h3>

        <p>{question}</p>

      </div>

      {/* STATUS */}
      <p className="status">

        {
          isListening
            ? "🎤 Listening..."
            : "🎤 Microphone Stopped"
        }

      </p>

      {/* BUTTONS */}
      <div className="speech-buttons">

        <button
          className="start-btn"
          onClick={
            startListening
          }
        >
          Start Speaking
        </button>

        <button
          className="stop-btn"
          onClick={
            stopListening
          }
        >
          Stop
        </button>

        <button
          className="clear-btn"
          onClick={
            clearAnswer
          }
        >
          Clear
        </button>

        <button
          className="feedback-btn"
          onClick={
            generateFeedback
          }
        >
          Feedback
        </button>

      </div>

      {/* ANSWER */}
      <div className="transcript-box">

        <h3>
          Your Answer
        </h3>

        <textarea
          value={answer}
          placeholder="Speak something..."
          readOnly
          rows={6}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border:
              "1px solid #ccc",
            fontSize: "16px",
          }}
        />

      </div>

      {/* FEEDBACK */}
      {
        feedback && (

          <div className="feedback-box">

            <h3>
              AI Feedback
            </h3>

            <p>
              {feedback}
            </p>

          </div>
        )
      }

    </div>
  );
};

export default VoiceInterviewQuestion;
