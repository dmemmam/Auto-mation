// Platform dimension mapping
const platformDimensions = {
    'youtube-shorts': { width: 1080, height: 1920, ratio: '9:16', maxDuration: 60 },
    'tiktok': { width: 1080, height: 1920, ratio: '9:16', maxDuration: 60 },
    'facebook-reels': { width: 1080, height: 1920, ratio: '9:16', maxDuration: 60 },
    'instagram-reels': { width: 1080, height: 1920, ratio: '9:16', maxDuration: 60 },
    'facebook-video': { width: 1280, height: 720, ratio: '16:9', maxDuration: 300 },
    'youtube-video': { width: 1920, height: 1080, ratio: '16:9', maxDuration: 300 }
};

// Platform names mapping
const platformNames = {
    'youtube-shorts': 'YouTube Shorts',
    'tiktok': 'TikTok',
    'facebook-reels': 'Facebook Reels',
    'instagram-reels': 'Instagram Reels',
    'facebook-video': 'Facebook Video',
    'youtube-video': 'YouTube Video'
};

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const durationSelect = document.getElementById('durationSelect');
const resolutionSelect = document.getElementById('resolutionSelect');
const videoContainer = document.getElementById('videoContainer');
const statusElement = document.getElementById('status');
const downloadBtn = document.getElementById('downloadBtn');
const youtubeBtn = document.getElementById('youtubeBtn');
const socialBtn = document.getElementById('socialBtn');
const selectedPlatformElement = document.getElementById('selectedPlatform');
const selectedResolutionElement = document.getElementById('selectedResolution');
const selectedDurationElement = document.getElementById('selectedDuration');
const previewSizeElement = document.getElementById('previewSize');
const previewPlatformElement = document.getElementById('previewPlatform');

// Get all platform radio buttons
const platformRadios = document.querySelectorAll('input[name="platform"]');

// Initialize
updatePreview();
updateInfoDisplay();

// Event Listeners
generateBtn.addEventListener('click', generateVideo);
downloadBtn.addEventListener('click', downloadVideo);
youtubeBtn.addEventListener('click', uploadToYouTube);
socialBtn.addEventListener('click', shareToSocialMedia);

// Add event listeners to all platform radios
platformRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        updatePreview();
        updateInfoDisplay();
        validateDurationForPlatform();
    });
});

// Add event listener for duration change
durationSelect.addEventListener('change', function() {
    updateInfoDisplay();
    validateDurationForPlatform();
});

// Add event listener for resolution change
resolutionSelect.addEventListener('change', updateInfoDisplay);

// Update video preview based on selected platform
function updatePreview() {
    const selectedPlatform = document.querySelector('input[name="platform"]:checked').value;
    const dimensions = platformDimensions[selectedPlatform];
    const platformName = platformNames[selectedPlatform];
    
    previewSizeElement.textContent = `${dimensions.width}×${dimensions.height} (${dimensions.ratio})`;
    previewPlatformElement.textContent = `${platformName} Format`;
    
    // Update placeholder styling based on orientation
    if (dimensions.ratio === '9:16') {
        videoContainer.style.height = '500px';
    } else {
        videoContainer.style.height = '300px';
    }
}

// Update info display
function updateInfoDisplay() {
    const selectedPlatform = document.querySelector('input[name="platform"]:checked').value;
    const duration = durationSelect.value;
    const resolution = resolutionSelect.value;
    const dimensions = platformDimensions[selectedPlatform];
    
    selectedPlatformElement.textContent = platformNames[selectedPlatform];
    selectedResolutionElement.textContent = `${dimensions.width}×${dimensions.height}`;
    selectedDurationElement.textContent = `${duration} seconds`;
}

// Validate duration for selected platform
function validateDurationForPlatform() {
    const selectedPlatform = document.querySelector('input[name="platform"]:checked').value;
    const selectedDuration = parseInt(durationSelect.value);
    const maxDuration = platformDimensions[selectedPlatform].maxDuration;
    
    if (selectedDuration > maxDuration) {
        alert(`⚠️ Warning: ${platformNames[selectedPlatform]} maximum duration is ${maxDuration} seconds. Please select a shorter duration.`);
        // Reset to maximum allowed duration
        durationSelect.value = maxDuration.toString();
        updateInfoDisplay();
    }
}

// Generate Video Function
function generateVideo() {
    const prompt = promptInput.value.trim();
    const duration = durationSelect.value;
    const resolution = resolutionSelect.value;
    const platform = document.querySelector('input[name="platform"]:checked').value;
    const platformName = platformNames[platform];
    
    // Validation
    if (!prompt) {
        alert('Please enter a video idea/prompt!');
        return;
    }
    
    if (prompt.length < 10) {
        alert('Please enter a more detailed prompt (at least 10 characters)');
        return;
    }
    
    // Update UI
    statusElement.textContent = 'Processing...';
    statusElement.className = 'info-value status-processing';
    generateBtn.disabled = true;
    generateBtn.innerHTML = '⏳ Generating...';
    
    // Show loading animation in video container
    videoContainer.innerHTML = `
        <div class="loading-animation">
            <div class="spinner"></div>
            <p>Creating your ${platformName} video...</p>
            <p class="loading-details">Duration: ${duration}s | Resolution: ${resolution} | Size: ${platformDimensions[platform].width}×${platformDimensions[platform].height}</p>
        </div>
    `;
    
    // Simulate AI video generation (This is where real AI would be integrated)
    // For now, we'll simulate with setTimeout
    setTimeout(() => {
        // Update status
        statusElement.textContent = 'Video Generated Successfully!';
        statusElement.className = 'info-value status-complete';
        
        // Enable download buttons
        downloadBtn.disabled = false;
        youtubeBtn.disabled = false;
        socialBtn.disabled = false;
        
        // Reset generate button
        generateBtn.disabled = false;
        generateBtn.innerHTML = '🎥 Generate AI Video';
        
        // Show preview video (simulated)
        showVideoPreview(platform);
        
        // Log details (In real implementation, this would call your AI API)
        console.log('=== Video Generation Details ===');
        console.log('Prompt:', prompt);
        console.log('Duration:', duration, 'seconds');
        console.log('Resolution:', resolution);
        console.log('Platform:', platformName);
        console.log('Dimensions:', `${platformDimensions[platform].width}×${platformDimensions[platform].height}`);
        console.log('==============================');
        
    }, 3000); // Simulate 3 second processing time
}

// Show video preview (simulated)
function showVideoPreview(platform) {
    const dimensions = platformDimensions[platform];
    
    videoContainer.innerHTML = `
        <div class="video-preview">
            <div class="video-frame" style="width: ${dimensions.width < dimensions.height ? '270px' : '480px'}; 
                                           height: ${dimensions.width < dimensions.height ? '480px' : '270px'};
                                           border-radius: 10px;
                                           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                           display: flex;
                                           flex-direction: column;
                                           align-items: center;
                                           justify-content: center;
                                           color: white;
                                           margin: 0 auto;">
                <div style="font-size: 3rem; margin-bottom: 20px;">🎬</div>
                <div style="font-size: 1.2rem; font-weight: bold; text-align: center;">
                    AI Generated Video
                </div>
                <div style="margin-top: 10px; opacity: 0.9;">
                    ${dimensions.width}×${dimensions.height}
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #4CAF50; font-weight: bold;">✅ Video Ready!</p>
                <p style="color: #666; font-size: 0.9rem;">Click Download to get your video file</p>
            </div>
        </div>
    `;
}

// Download Video Function
function downloadVideo() {
    // In real implementation, this would download the actual video file
    alert('📥 In the real version, this would download your AI-generated video file.\nFor now, this is a simulation.');
    
    // Create a simulated download
    const prompt = promptInput.value.substring(0, 20);
    const platform = document.querySelector('input[name="platform"]:checked').value;
    const platformName = platformNames[platform];
    
    const simulatedContent = `AI Video Generated for: ${prompt}...\nPlatform: ${platformName}\nGenerated by MD Emam Hossain's AI Video Maker`;
    const blob = new Blob([simulatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-video-${platform}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Upload to YouTube Function
function uploadToYouTube() {
    alert('▶️ In the real version, this would upload directly to YouTube using YouTube API.\nFor now, this is a simulation.');
    
    // Simulate YouTube upload process
    statusElement.textContent = 'Uploading to YouTube...';
    setTimeout(() => {
        statusElement.textContent = 'Uploaded to YouTube Successfully!';
        alert('✅ Video uploaded to YouTube! (Simulation)');
    }, 1500);
}

// Share to Social Media Function
function shareToSocialMedia() {
    const platform = document.querySelector('input[name="platform"]:checked').value;
    const platformName = platformNames[platform];
    
    alert(`📱 In the real version, this would share to ${platformName} using their API.\nFor now, this is a simulation.`);
    
    // Simulate social media sharing
    statusElement.textContent = `Sharing to ${platformName}...`;
    setTimeout(() => {
        statusElement.textContent = `Shared to ${platformName} Successfully!`;
    }, 1500);
}

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    .loading-animation {
        text-align: center;
        padding: 40px;
    }
    
    .spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-details {
        color: #666;
        font-size: 0.9rem;
        margin-top: 10px;
    }
`;
document.head.appendChild(style);