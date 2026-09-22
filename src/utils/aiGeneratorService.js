// Dynamic AI Prompt & Copy Generation Service

export const aiGeneratorService = {
  // Generate real bespoke AI prompt or script
  async generateText({ prompt, taskType = 'prompt', model = 'midjourney', styleModifiers = [] }) {
    const userKey = localStorage.getItem('lumina_user_ai_key');
    const provider = localStorage.getItem('lumina_user_ai_provider') || 'groq';

    // 1. If user supplied a real Groq API Key
    if (userKey && provider === 'groq') {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.1-70b-versatile',
            messages: [
              { role: 'system', content: 'You are Lumina AI, an expert prompt engineer and viral copywriter.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7
          })
        });
        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          return data.choices[0].message.content;
        }
      } catch (err) {
        console.warn("Groq API call failed, falling back to built-in engine:", err);
      }
    }

    // 2. High-Intelligence Built-in Generator Engine (Zero API Cost)
    if (taskType === 'prompt') {
      const styles = styleModifiers.length > 0 ? styleModifiers.join(', ') : 'Cinematic Lighting, Octane Render, 8K Ultra Detailed';
      if (model === 'midjourney') {
        return `${prompt}, ${styles}, masterpiece composition, dramatic atmospheric depth, volumetric lighting, photorealistic, 8k resolution --ar 16:9 --stylize 750 --v 6.0`;
      } else if (model === 'chatgpt') {
        return `Act as a world-class prompt engineer. Construct a master prompt for: "${prompt}". Incorporate aesthetic controls: [${styles}]. Ensure clean formatting, explicit technical parameters, and zero conversational filler.`;
      } else {
        return `masterpiece, best quality, ${prompt}, ${styles}, highly detailed, sharp focus, raytracing, unreal engine 5 render`;
      }
    } else if (taskType === 'viral_copy') {
      return `🔥 VIRAL HOOK & SCRIPT FRAMEWORK
Subject: ${prompt}

[0:00 - 0:03] THE PATTERN INTERRUPT HOOK:
"99% of people are doing ${prompt} completely wrong. Here is the secret framework top 1% creators use to print results..."

[0:03 - 0:15] THE CORE VALUE STACK:
- Step 1: Automate the underlying manual friction using AI.
- Step 2: Scale distribution across YouTube Shorts, TikTok, and X.
- Step 3: Convert raw views into high-ticket email leads.

[0:15 - 0:25] CALL TO ACTION (CTA):
"Drop a comment 'GROWTH' below and I will send you the complete step-by-step PDF blueprint for free."`;
    }

    return prompt;
  }
};
