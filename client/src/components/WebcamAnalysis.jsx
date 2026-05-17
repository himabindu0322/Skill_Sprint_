import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./WebcamAnalysis.css";

const WebcamAnalysis = () => {

  const videoRef = useRef(null);

  const [cameraOn, setCameraOn] =
    useState(false);

  const [analysis, setAnalysis] =
    useState("");

  // START CAMERA
  const startCamera = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

      if (videoRef.current) {

        videoRef.current.srcObject =
          stream;
      }

      setCameraOn(true);

      alert(
        "📷 Webcam Started Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Camera permission denied."
      );
    }
  };

  // STOP CAMERA
  const stopCamera = () => {

    const stream =
      videoRef.current.srcObject;

    if (stream) {

      const tracks =
        stream.getTracks();

      tracks.forEach((track) =>
        track.stop()
      );
    }

    setCameraOn(false);

    alert(
      "📷 Webcam Stopped"
    );
  };

  // AI ANALYSIS
  const analyzeUser = () => {

    let feedback = [];

    // RANDOM FEEDBACK
    feedback.push(
      "Good face visibility."
    );

    feedback.push(
      "Maintain eye contact."
    );

    feedback.push(
      "Try to smile confidently."
    );

    feedback.push(
      "Posture looks professional."
    );

    setAnalysis(
      feedback.join("\n")
    );
  };

  // CLEANUP
  useEffect(() => {

    return () => {

      if (
        videoRef.current &&
        videoRef.current.srcObject
      ) {

        const tracks =
          videoRef.current.srcObject.getTracks();

        tracks.forEach((track) =>
          track.stop()
        );
      }
    };
  }, []);

  return (

    <div className="webcam-container">

      <h2>
        Webcam Analysis
      </h2>

      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="webcam-video"
      />

      {/* BUTTONS */}
      <div className="webcam-buttons">

        <button
          className="camera-btn"
          onClick={startCamera}
        >
          Start Camera
        </button>

        <button
          className="stop-camera-btn"
          onClick={stopCamera}
        >
          Stop Camera
        </button>

        <button
          className="analyze-btn"
          onClick={analyzeUser}
        >
          Analyze
        </button>

      </div>

      {/* STATUS */}
      <p className="camera-status">

        {
          cameraOn
            ? "📷 Camera Active"
            : "📷 Camera Off"
        }

      </p>

      {/* ANALYSIS */}
      {
        analysis && (

          <div className="analysis-box">

            <h3>
              AI Feedback
            </h3>

            <pre>
              {analysis}
            </pre>

          </div>
        )
      }

    </div>
  );
};

export default WebcamAnalysis;
