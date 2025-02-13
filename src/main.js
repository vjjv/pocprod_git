

//FLIP CAMERA EXAMPLE
import {
    bootstrapCameraKit,
    CameraKitSession,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit';

const liveRenderTarget = document.getElementById('canvas');
const flipCamera = document.getElementById('flip');
const intro = document.getElementById('intro-bg');
var firstTime = true;
document.body.addEventListener('click', () => {
    if (firstTime) {
        firstTime = false;
        if (typeof DeviceMotionEvent.requestPermission === 'function') DeviceMotionEvent.requestPermission();
        intro.style.display = 'none';
        init();
    }
}, true);


let isBackFacing = true;
let mediaStream;

async function init() {
    const cameraKit = await bootstrapCameraKit({
        apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM5NDU4Nzc3LCJzdWIiOiJjMGE2ODQ5OC1hZTU4LTQzMDctODcwMy00MTZhM2YzYTNmNDZ-U1RBR0lOR344YTRmOTliMC1lODk4LTQ1MzYtOTllMS0wNDIyMmFhMjJkYTAifQ.iIcIm23CCTcxNk_cim4JkSZnUCWC5yjbHfqCAXTuF9w', //staging POCPROD
    });

    const session = await cameraKit.createSession({ liveRenderTarget });
    const { lenses } = await cameraKit.lensRepository.loadLensGroups([
        '8b4ee0f8-4839-4162-a17c-dc032788a7db',
    ]);

    session.applyLens(lenses[0]);

    bindFlipCamera(session);
}

function bindFlipCamera(session) {
    flipCamera.style.cursor = 'pointer';

    flipCamera.addEventListener('click', () => {
        updateCamera(session);
    });

    updateCamera(session);
}

async function updateCamera(session) {

    // flipCamera.innerText = isBackFacing
    // ? 'Switch to Front Camera'
    // : 'Switch to Back Camera';

    if (mediaStream) {
        session.pause();
        mediaStream.getVideoTracks()[0].stop();
    }

    mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: isBackFacing ? 'environment' : 'user',
        },
    });

    const source = createMediaStreamSource(mediaStream, {
        // NOTE: This is important for world facing experiences
        cameraType: isBackFacing ? 'back' : 'front',
    });

    await session.setSource(source);

    if (!isBackFacing) {
        source.setTransform(Transform2D.MirrorX);
    }

    session.play();
    isBackFacing = !isBackFacing;
}

// init();