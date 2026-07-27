const fs = require('fs');
let lines = fs.readFileSync('src/app/services/social-media-marketing/page.js', 'utf8').split('\n');
lines.splice(528, 263, 
  '        <div className="smm-hero-visual">',
  '          <Image src="/smm-hero.webp" alt="Social Media Marketing" width={800} height={600} style={{ width: "100%", height: "auto", borderRadius: "16px", objectFit: "cover", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }} priority />',
  '        </div>'
);
fs.writeFileSync('src/app/services/social-media-marketing/page.js', lines.join('\n'));
