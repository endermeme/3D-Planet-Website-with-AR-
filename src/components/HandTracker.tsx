import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Hands } from '@mediapipe/hands';
import type { Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

interface HandTrackerProps {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    onZoomDelta: (delta: number) => void;
}

export const HandTracker = ({ onSwipeLeft, onSwipeRight, onZoomDelta }: HandTrackerProps) => {
    const webcamRef = useRef<Webcam>(null);
    const [cameraReady, setCameraReady] = useState(false);

    // Gesture State
    const lastPinchDistRef = useRef<number | null>(null);
    const lastWristXRef = useRef<number | null>(null);
    const swipeCooldownRef = useRef<number>(0);

    // Visual Feedback State
    const [gestureMode, setGestureMode] = useState<'SWIPE' | 'ZOOM' | 'NONE'>('NONE');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            },
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        hands.onResults(onResults);

        const startCamera = async () => {
            try {
                // Explicitly request permission first to ensure the prompt appears
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                // If successful, we can let the Camera utility handle it or use the stream directly.
                // The Camera utility from MediaPipe is convenient, but sometimes explicit stream handling is more robust.
                // For now, just requesting permission is enough to trigger the browser prompt.
                // We stop the stream immediately because the Camera utility will request it again or we pass it?
                // Actually, the Camera utility takes a video element.

                if (webcamRef.current && webcamRef.current.video) {
                    const camera = new Camera(webcamRef.current.video, {
                        onFrame: async () => {
                            if (webcamRef.current && webcamRef.current.video) {
                                await hands.send({ image: webcamRef.current.video });
                            }
                        },
                        width: 640,
                        height: 480
                    });
                    camera.start();
                    setCameraReady(true);
                }

                // Stop the initial test stream to release the camera for the Camera utility
                stream.getTracks().forEach(track => track.stop());

            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("Không thể truy cập camera! Vui lòng cấp quyền camera để sử dụng tính năng điều khiển bằng tay.");
            }
        };

        startCamera();

        return () => {
            hands.close();
        }
    }, []);

    const onResults = (results: Results) => {
        const now = Date.now();
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.scale(-1, 1); // Mirror
            ctx.translate(-canvas.width, 0);
        }

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];

            // Landmarks
            const thumbTip = landmarks[4];
            const indexTip = landmarks[8];
            const wrist = landmarks[0];

            // Draw Landmarks
            if (ctx && canvas) {
                ctx.strokeStyle = '#00FF00';
                ctx.lineWidth = 2;

                const drawPoint = (p: any, color: string) => {
                    ctx.beginPath();
                    ctx.arc(p.x * canvas.width, p.y * canvas.height, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = color;
                    ctx.fill();
                };

                drawPoint(thumbTip, 'red');
                drawPoint(indexTip, 'red');
                drawPoint(wrist, 'blue'); // Show wrist for swipe tracking

                ctx.beginPath();
                ctx.moveTo(thumbTip.x * canvas.width, thumbTip.y * canvas.height);
                ctx.lineTo(indexTip.x * canvas.width, indexTip.y * canvas.height);
                ctx.stroke();
            }

            // --- 1. ZOOM (Pinch Distance Change) ---
            const pinchDistance = Math.sqrt(
                Math.pow(thumbTip.x - indexTip.x, 2) +
                Math.pow(thumbTip.y - indexTip.y, 2)
            );

            // Calculate Pinch Center (Midpoint)
            const pinchCenterX = (thumbTip.x + indexTip.x) / 2;

            // If we have a previous distance, calculate delta
            if (lastPinchDistRef.current !== null) {
                const delta = pinchDistance - lastPinchDistRef.current;

                // Threshold to avoid jitter
                if (Math.abs(delta) > 0.002) {
                    // "Mở ra" (Increase distance) -> Zoom In (Positive Delta)
                    // "Thu vào" (Decrease distance) -> Zoom Out (Negative Delta)
                    const zoomSensitivity = 3.0;
                    onZoomDelta(delta * zoomSensitivity);
                    setGestureMode('ZOOM');
                }
            }
            lastPinchDistRef.current = pinchDistance;


            // --- 2. SWIPE (Pinch Center Movement) ---
            // User wants to swipe with the same two fingers.

            if (lastWristXRef.current !== null) {
                const deltaX = pinchCenterX - lastWristXRef.current; // Using pinchCenterX now

                // Swipe Threshold
                const swipeThreshold = 0.08;

                if (now > swipeCooldownRef.current) {
                    if (deltaX > swipeThreshold) {
                        // Moved Right
                        onSwipeLeft();
                        swipeCooldownRef.current = now + 500; // Reduced cooldown
                        setGestureMode('SWIPE');
                    } else if (deltaX < -swipeThreshold) {
                        // Moved Left
                        onSwipeRight();
                        swipeCooldownRef.current = now + 500;
                        setGestureMode('SWIPE');
                    }
                }
            }
            lastWristXRef.current = pinchCenterX; // Update last X to be current pinch center

        } else {
            setGestureMode('NONE');
            lastPinchDistRef.current = null;
            lastWristXRef.current = null;
        }

        if (ctx) ctx.restore();
    };

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
            <div style={{ position: 'relative', width: 320, height: 240 }}>
                <Webcam
                    ref={webcamRef}
                    style={{ width: '100%', height: '100%', transform: 'scaleX(-1)', opacity: 0.5 }}
                    videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
                />
                <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                />
                <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    color: gestureMode === 'ZOOM' ? 'yellow' : (gestureMode === 'SWIPE' ? '#00FF00' : 'white'),
                    fontWeight: 'bold',
                    fontSize: '1.2em',
                    textShadow: '0 0 5px black'
                }}>
                    MODE: {gestureMode}
                </div>
            </div>
            {!cameraReady && <div style={{ color: 'white' }}>Loading Camera...</div>}
        </div>
    );
};
