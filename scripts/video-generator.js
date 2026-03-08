/**
 * Short Video Generator for CSS Berlin Products
 * Uses Gemini Pro to generate video scripts and creates 10-second shorts
 *
 * Requirements:
 * - Gemini Pro API key (set in .env: GEMINI_API_KEY)
 * - ffmpeg installed (for video rendering)
 *
 * Usage: node scripts/video-generator.js
 */

const fs = require('fs');
const path = require('path');

// Gemini Pro API Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Generate video script using Gemini Pro
 */
async function generateVideoScript(product) {
  const prompt = `
You are a social media content creator for a sustainable second-hand fashion store called "CSS Berlin".

Create a 10-second TikTok/Instagram Reels/YouTube Shorts video script for this product:

Product: ${product.name}
Brand: ${product.brand}
Price: €${product.price}
Condition: ${product.condition}
Category: ${product.categorySlug} / ${product.subcategorySlug}
CO₂ Saved: ${product.carbonSaved} kg

Requirements:
- Duration: Exactly 10 seconds
- Hook: First 1-2 seconds must grab attention
- Tone: Trendy, eco-conscious, Gen-Z friendly
- Include: Price, brand, sustainability angle
- Call-to-action: "Link in bio" or "Shop now on cssberlin.de"
- Language: GERMAN (casual, authentic)

Format your response as JSON:
{
  "hook": "First 1-2 seconds text (attention-grabbing)",
  "body": "Main 6-7 seconds content",
  "cta": "Call-to-action (1-2 seconds)",
  "hashtags": ["#hashtag1", "#hashtag2", ...],
  "caption": "Instagram/TikTok caption (emoji-friendly)",
  "voiceover": "Text-to-speech script (complete 10s narration)"
}

Make it viral-worthy! Focus on sustainability, affordability, and style.
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,  // Creative responses
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Extract JSON from response (sometimes Gemini wraps it in markdown)
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Gemini response');
    }

    const script = JSON.parse(jsonMatch[0]);
    return script;

  } catch (error) {
    console.error('❌ Gemini API error:', error.message);

    // Fallback template
    return {
      hook: `Schau dir das an! 😍`,
      body: `${product.brand} ${product.name} für nur €${product.price}! Second-Hand Shopping spart ${product.carbonSaved} kg CO₂. Nachhaltige Mode für dein Budget! 💚`,
      cta: `Jetzt auf cssberlin.de!`,
      hashtags: ['#SecondHandMode', '#Nachhaltigkeit', '#CSSBerlin', '#Vintage', '#ThriftFlip'],
      caption: `${product.brand} für nur €${product.price}! 💚 #SecondHand #Sustainability`,
      voiceover: `Schau dir das an! ${product.brand} ${product.name} für nur ${product.price} Euro. Second-Hand Shopping spart ${product.carbonSaved} Kilogramm CO-zwei. Nachhaltige Mode für dein Budget. Jetzt auf cssberlin punkt de!`
    };
  }
}

/**
 * Create video template configuration
 * This generates a JSON config that can be used with video rendering tools
 */
function createVideoConfig(product, script) {
  return {
    format: {
      width: 1080,
      height: 1920, // Vertical (9:16)
      fps: 30,
      duration: 10, // seconds
    },
    scenes: [
      {
        duration: 2,
        type: 'hook',
        text: script.hook,
        style: {
          fontSize: 80,
          fontWeight: 'bold',
          color: '#FFFFFF',
          backgroundColor: '#1B4332', // CSS Berlin green
          animation: 'zoomIn',
        },
        image: product.images[0]?.url || '',
      },
      {
        duration: 6,
        type: 'body',
        text: script.body,
        style: {
          fontSize: 60,
          color: '#FFFFFF',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        },
        image: product.images[0]?.url || '',
        overlay: {
          brand: product.brand,
          price: `€${product.price}`,
          co2: `${product.carbonSaved} kg CO₂ gespart`,
        },
      },
      {
        duration: 2,
        type: 'cta',
        text: script.cta,
        style: {
          fontSize: 70,
          fontWeight: 'bold',
          color: '#FFD700', // Gold
          backgroundColor: '#1B4332',
          animation: 'pulse',
        },
        qrCode: 'https://cssberlin.de',
      },
    ],
    audio: {
      voiceover: {
        text: script.voiceover,
        language: 'de-DE',
        voice: 'de-DE-Neural2-C', // Google Cloud TTS voice
      },
      music: {
        url: 'https://example.com/upbeat-music.mp3', // Royalty-free background music
        volume: 0.3,
      },
    },
    metadata: {
      title: `${product.brand} ${product.name} | CSS Berlin`,
      description: script.caption,
      hashtags: script.hashtags,
      productUrl: `https://cssberlin.de/products/${product.slug}`,
    },
  };
}

/**
 * Generate video using ffmpeg (simplified version)
 * For production, use tools like Remotion, Canva API, or After Effects templates
 */
async function renderVideoSimple(videoConfig, outputPath) {
  console.log('⚠️  NOTE: This is a placeholder for video rendering.');
  console.log('   For actual video creation, use:');
  console.log('   - Remotion (React-based video rendering)');
  console.log('   - Canva API (template-based)');
  console.log('   - ffmpeg (command-line video editing)');
  console.log('   - Adobe After Effects (with automation)');
  console.log('');
  console.log(`   Video config saved to: ${outputPath}.json`);

  // Save video config for later rendering
  fs.writeFileSync(
    `${outputPath}.json`,
    JSON.stringify(videoConfig, null, 2)
  );

  return `${outputPath}.json`;
}

/**
 * Upload video to social media platforms
 */
async function uploadToSocialMedia(videoPath, metadata, platforms) {
  console.log('\n📤 Uploading video to social media...');

  const results = {};

  for (const platform of platforms) {
    try {
      switch (platform) {
        case 'youtube':
          results.youtube = await uploadToYouTube(videoPath, metadata);
          break;
        case 'tiktok':
          results.tiktok = await uploadToTikTok(videoPath, metadata);
          break;
        case 'instagram':
          results.instagram = await uploadToInstagram(videoPath, metadata);
          break;
        case 'pinterest':
          results.pinterest = await uploadToPinterest(videoPath, metadata);
          break;
      }
    } catch (error) {
      console.error(`   ❌ ${platform} upload failed:`, error.message);
    }
  }

  return results;
}

async function uploadToYouTube(videoPath, metadata) {
  // YouTube Data API v3
  // Requires OAuth 2.0 authentication
  console.log('   📺 YouTube Shorts: Not implemented (requires OAuth)');
  return { status: 'pending', url: null };
}

async function uploadToTikTok(videoPath, metadata) {
  // TikTok API (Business account required)
  console.log('   🎵 TikTok: Not implemented (requires Business account)');
  return { status: 'pending', url: null };
}

async function uploadToInstagram(videoPath, metadata) {
  // Instagram Graph API (requires Facebook Business account)
  console.log('   📸 Instagram Reels: Not implemented (requires Business account)');
  return { status: 'pending', url: null };
}

async function uploadToPinterest(videoPath, metadata) {
  // Pinterest API
  console.log('   📌 Pinterest: Not implemented (requires API key)');
  return { status: 'pending', url: null };
}

/**
 * Main execution
 */
async function main() {
  console.log('🎬 CSS Berlin - Short Video Generator\n');

  if (!GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY not found in .env');
    console.log('   Get your API key from: https://makersuite.google.com/app/apikey');
    process.exit(1);
  }

  try {
    // Load products from JSON
    const productsPath = path.join(__dirname, 'vinted-products.json');

    if (!fs.existsSync(productsPath)) {
      console.error('❌ Error: vinted-products.json not found!');
      console.log('   Run "node scripts/vinted-scraper.js" first.');
      process.exit(1);
    }

    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

    // Limit to first 5 products (Gemini free tier: ~50 requests/day)
    const productsToProcess = products.slice(0, 5);

    console.log(`📦 Processing ${productsToProcess.length} products...\n`);

    // Create output directory
    const outputDir = path.join(__dirname, '../videos');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const [index, product] of productsToProcess.entries()) {
      console.log(`\n[${index + 1}/${productsToProcess.length}] ${product.name}`);

      // Generate script with Gemini Pro
      console.log('   🤖 Generating script with Gemini Pro...');
      const script = await generateVideoScript(product);

      console.log('   ✅ Script generated:');
      console.log(`      Hook: ${script.hook}`);
      console.log(`      Hashtags: ${script.hashtags.join(', ')}`);

      // Create video configuration
      const videoConfig = createVideoConfig(product, script);

      // Render video (placeholder)
      const outputPath = path.join(outputDir, `${product.slug}`);
      await renderVideoSimple(videoConfig, outputPath);

      console.log(`   💾 Video config saved: ${outputPath}.json`);

      // Rate limiting for Gemini API (1 request per 2 seconds)
      if (index < productsToProcess.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log('\n✅ Video generation completed!\n');
    console.log('📝 Next steps:');
    console.log('   1. Review video configs in ./videos/ folder');
    console.log('   2. Render videos using Remotion or Canva');
    console.log('   3. Upload to social media platforms');
    console.log('   4. Schedule posts with Buffer or Hootsuite');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  generateVideoScript,
  createVideoConfig,
  uploadToSocialMedia,
};
