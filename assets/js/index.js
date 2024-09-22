const blogs = [
  {
      title: "How to store dry red chillies for longer shelf life?",
      description: "Red chillies are essential in Indian cuisine, providing color, flavor, and taste; however, improper storage can lead to spoilage. To extend the shelf life of dry red chillies, it’s crucial to store them in airtight containers in a cool, dark place and to use them within a year. Common causes of spoilage include dehydration, light, oxygen, and temperature fluctuations. Tips for repacking include using vacuum-sealed bags, drying them with a food dehydrator, or storing them in sterilized glass jars. Avoid plastic bags and ensure chillies are completely dry before storage to prevent oxidation. Regularly inspect stored chillies for damage and label containers with packing dates. By following these guidelines, you can effectively prolong the freshness of your dry red chillies, making them last longer for your culinary needs."
  },
  {
      title: "5 Tips for Drying Red Chillies at Home",
      description: "Drying chillies at home is easy with these 5 tips: air dry, use a dehydrator, sun dry, oven dry, and microwave dry. Each method ensures long-lasting flavor and quality."
  },
  {
    title: "Did you know this about red dry chillies?",
    description: "Here are five must-know facts about red dried chillies: <strong>1. **High in Vitamin C**:</strong> Red dried chillies are packed with Vitamin C, even more than citrus fruits like oranges. They help boost the immune system and promote healthy skin. <strong>2. **Capsaicin Power**:</strong> The heat of red chillies comes from a compound called capsaicin. This compound not only adds spice but also has anti-inflammatory and pain-relief properties, making it popular in creams for sore muscles.   <strong>3. **Natural Preservative**:</strong> Due to their antimicrobial properties, dried red chillies act as a natural preservative. They prevent bacterial growth in foods, which is why they’re commonly used in pickles and spice blends. <strong>4. **Different Varieties, Different Heat Levels**:</strong> Not all red chillies are equally hot. Varieties like the Teja S17 are much hotter than others like the Kashmiri chilli, which is milder and used more for color than heat. <strong>5. **Boosts Metabolism**:</strong> Capsaicin in red chillies is known to increase metabolic rate, which can aid in fat burning and weight loss. It’s why spicy food often leaves you sweating – your body is burning more energy!"
  }
];

function zforms_open_window(url, height, width) {
  var leftPos = 0;
  var topPos = 0;
  if (screen) {
    leftPos = (screen.width - width) / 2;
    topPos = (screen.height - height) / 2;
    window.open(url, null, 'width=' + width + ',height=' + height + ',left=' + leftPos + ',top=' + topPos + ', toolbar=0, location=0, status=1, scrollbars=1, resizable=1');
  }
}

// gst image
function toggleImage() {
  var imageSection = document.getElementById("image-section");
  var arrow = document.getElementById("arrow");

  // Toggle display of image section
  if (imageSection.style.display === "none") {
      imageSection.style.display = "block"; // Show the image
      arrow.className = "arrow-down"; // Change arrow to downward
  } else {
      imageSection.style.display = "none"; // Hide the image
      arrow.className = "arrow-up"; // Change arrow to upward
  }
}

// blogs
// Function to generate the blog sections dynamically
function generateBlogs() {
  const blogContainer = document.getElementById('blog-sections'); // Parent container to hold all blogs
  blogs.forEach((blog, index) => {
      // Create a new div for each blog
      const blogHTML = `
          <div class="blog-section" data-blog-id="${index + 1}">
              <div class="banner-container" onclick="toggleBlogPost(this)">
                  <div class="banner-content">
                      <h2>${blog.title}</h2>
                      <span class="arrow-up"></span>
                  </div>
              </div>
              <div class="b-container" style="display: none;">
                  <p>${blog.description}</p>
              </div>
          </div>
      `;
      
    if (blogContainer) {
      // Append the HTML to the container
      blogContainer.innerHTML += blogHTML;
    }
  });
}

// Call the function to generate the blogs on page load
document.addEventListener('DOMContentLoaded', generateBlogs);


function toggleBlogPost(element) {
  // Find the blog container (b-container) related to the clicked banner
  const blogContainer = element.nextElementSibling;

  // Toggle the display of the blog post
  if (blogContainer.style.display === "none") {
      blogContainer.style.display = "block";
      element.querySelector('.arrow-up').classList.add('arrow-down');
      element.querySelector('.arrow-up').classList.remove('arrow-up')
  } else {
      blogContainer.style.display = "none";
      element.querySelector('.arrow-down').classList.add('arrow-up')
      element.querySelector('.arrow-down').classList.remove('arrow-down');
  }
}


// google sheets - price table
const API_KEY = 'AIzaSyDTNXpn-TFWhInawEkrm94tp7wSVDIG9T0';
const SPREADSHEET_ID = '1ntdLZUDLOj8cAfd6vessJ8-ENsbOBu05KuVtiELkq0Y';
const RANGE = 'chilli_prices!A1:C18'; // Adjust this range based on your data structure

async function fetchDailyPrices() {
  const cacheKey = 'cachedDailyPrices';
  const cacheTimeKey = 'cacheTime';
  const cacheDuration = 10000 * 60 * 1000; // Cache for 1 week

  // Check if cached data exists and is still valid
  const cachedPrices = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimeKey);
  
  if (cachedPrices && cachedTime && (Date.now() - cachedTime < cacheDuration)) {
      // If valid cache is available, use it
      displayPrices(JSON.parse(cachedPrices));
  } else {
      // Fetch new prices from Google Sheets API
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      
      try {
          const response = await fetch(url);
          const data = await response.json();

          // Cache the fetched prices and the current time
          localStorage.setItem(cacheKey, JSON.stringify(data.values));
          localStorage.setItem(cacheTimeKey, Date.now());

          displayPrices(data.values);
      } catch (error) {
          console.error('Error fetching prices:', error);
      }
  }
}

// Function to display prices on the webpage
function displayPrices(prices) {
  const pricesContainer = document.getElementById('daily-prices');
  let html = '<table class="prices-table">';
  
  html += '<thead><tr><th>Chilli Type</th><th>Variety</th><th>Price per Qtl</th></tr></thead>'; // Add table headers
  html += '<tbody>';

  prices.forEach(row => {
      html += `<tr class="price-row"><td class="price-type">${row[0]}</td><td class="price-variety">${row[1]}</td><td class="price-price">${row[2]}</td></tr>`;
  });

  html += '</tbody></table>';
  
  if (pricesContainer) {
      // Append the HTML to the container
      pricesContainer.innerHTML = html;
  }
}
//=========

const products = [
  {
    title : "Teja S17 Dried Red Chilli",
    description : "Teja chilli, one of the hottest varieties available, is primarily grown in southern India, near the renowned Guntur Mirchi Market. Known globally as S17 Teja chilli, it is highly sought after by international buyers. Our Teja chillies are offered in stemless, with stem, and powdered forms, making them perfect for soups, stir-fries, stews, and spice blends. Ideal for long-term storage, Teja chilli combines intense heat with exceptional quality.",
    images: [
      'assets/images/teja1.jpeg',
      'assets/images/teja2.jpeg'
    ],
    features: [
            { feature: 'Color', value: 'Deep red with a glossy finish' },
            { feature: 'Skin', value: 'Thin yet firm, with fewer seeds' },
            { feature: 'Aroma', value: 'Pungent, earthy fragrance' },
            { feature: 'Shape', value: 'Pointed tip with medium-length body' },
            { feature: 'Pungency', value: 'High, ideal for spicing up dishes' },
            { feature: 'Processing', value: 'Sun-dried' },
            { feature: 'Capsaicin Percentage', value: '0.589%' },
            { feature: 'Length', value: '5-7 cm (2-3 inches)' },
            { feature: 'Heat Level', value: '50,000 to 100,000 SHU' },
            { feature: 'ASTA Color Value', value: '75-100' },
            { feature: 'Moisture', value: '8-10%' }
    ]
  },
  {
    title: "334 S4/Sannam Dried Red Chilli",
    description: "Guntur Sannam chilli, also known as S4, is renowned for its bright red color and moderate heat, perfect for enhancing both flavor and appearance in dishes. Grown in the rich soils of Andhra Pradesh's Guntur, Khammam, and Prakasam districts, this chilli is globally recognized for its consistent quality. With its thick skin, Guntur Sannam delivers bold flavor whether used as a powder or crushed, making it a top choice for spice blends, curries, and sauces.",
    images: [
      "assets/images/334.jpeg",
      "assets/images/334_2.jpeg"
    ],
    features: [
      { feature: "Color", value: "Deep red, glossy texture" },
      { feature: "Skin", value: "Medium-thick" },
      { feature: "Aroma", value: "Mild, fruity & earthy undertone" },
      { feature: "Shape", value: "Elongated and slight conical curve" },
      { feature: "Pungency", value: "Moderate heat" },
      { feature: "Processing", value: "Traditionally sun-dried" },
      { feature: "Capsaicin Percentage", value: "0.226" },
      { feature: "Length", value: "5-8 cm (2-3 inches)" },
      { feature: "Heat Level", value: "20,000 to 35,000 SH" },
      { feature: "ASTA Color Value", value: "60-80" },
      { feature: "Moisture", value: "10-12%" }
    ]
  },
  {
    title: "Bydgi Dried Red Chilli",
    description: "Byadgi chilli is a premium variety known for its vibrant red color and mild heat, making it ideal for adding a deep red hue to dishes without intense spiciness. Grown in the fertile regions of Karnataka, Byadgi chillies are popular for making chilli powder, spice blends, and curry pastes. Their smooth texture and natural oils enhance the flavor and color of sauces, gravies, and seasonings. Favored by culinary professionals and home chefs alike, Byadgi chillies are a kitchen essential.Additionally, their color is utilized in the cosmetics industry for nail polish.",
    images: [
      "assets/images/bydgi.jpeg",
      "assets/images/bydgi1.jpg"
    ],
    features: [
      { feature: "Color", value: "Bright red, with a deep, rich hue" },
      { feature: "Skin", value: "Wrinkled and dry" },
      { feature: "Shape", value: "Slightly bent, wrinkled skin" },
      { feature: "Aroma", value: "Sweet aroma & fruity undertone" },
      { feature: "Pungency", value: "Very mild heat" },
      { feature: "Processing", value: "Naturally sun-dried" },
      { feature: "Capsaicin Percentage", value: "0.226%" },
      { feature: "Length", value: "12-15 cm (5-6 inches)" },
      { feature: "Heat Level", value: "8,000 to 15,000 SHU" },
      { feature: "ASTA Color Value", value: "100-160" },
      { feature: "Moisture", value: "10-12%" }
    ]
  },
  {
    title: "341 Dried Red Chilli",
    description: "Guntur 341 chilli is a premium variety known for its bright red color and moderate heat, offering the perfect balance between spice and flavor. Grown in the renowned Guntur region of Andhra Pradesh, this chilli is praised for its consistent quality and rich flavor. Ideal for making powders, spice blends, and curries, Guntur 341 chilli adds vibrant color and aromatic heat to any dish. Popular among international buyers and widely used by masala and red chilli powder manufacturers, it’s a top choice for authentic flavor and color in cooking.",
    images: [
      "assets/images/341.png",
      "assets/images/341-ts.jpeg"
    ],
    features: [
      { feature: "Color", value: "Bright red with a smooth texture" },
      { feature: "Skin", value: "Thin" },
      { feature: "Aroma", value: "Mild and earthy" },
      { feature: "Shape", value: "Long, slender with pointed tip" },
      { feature: "Pungency", value: "Moderate" },
      { feature: "Processing", value: "Typically sun-dried" },
      { feature: "Capsaicin Percentage", value: "0.226%" },
      { feature: "Length", value: "6-8 cm (2.5-3.5 inches)" },
      { feature: "Heat Level", value: "30,000 to 50,000 SHU" },
      { feature: "ASTA Color Value", value: "90-120" },
      { feature: "Moisture", value: "10-12%" }
    ]
  },
  {
    title: "No 5 Dried Red Chilli",
    description: "Guntur No.5 chilli is a premium variety celebrated for its vibrant red color and moderate to high heat, perfect for those who enjoy bold flavors. Grown in the fertile Guntur region of Andhra Pradesh, this chilli is known for its consistent quality and exceptional taste. Ideal for making chilli powder, spice blends, and sauces, Guntur No.5 chilli enhances both flavor and appearance in dishes. Its robust aroma and deep red color make it a favorite among chefs and food enthusiasts worldwide. Choose Guntur No.5 chilli to add a flavorful kick to your cooking, with its dark red color and medium size.",
    images: [
      "assets/images/No.5.jpeg",
      "assets/images/no5.jpeg"
    ],
    features: [
      { feature: "Color", value: "Bright red with a glossy finish" },
      { feature: "Skin", value: "Smooth, thin, and firm texture" },
      { feature: "Aroma", value: "Strong, spicy, smoky" },
      { feature: "Shape", value: "Long, pointed and slender" },
      { feature: "Pungency", value: "Moderate heat" },
      { feature: "Processing", value: "Sun-dried for enhanced flavor" },
      { feature: "Capsaicin Percentage", value: "0.226%" },
      { feature: "Length", value: "10-15 cm (4-6 inches)" },
      { feature: "Heat Level", value: "15,000 to 25,000 SHU" },
      { feature: "ASTA Color Value", value: "80-120" },
      { feature: "Moisture", value: "10-12%" }
    ]
  },
  {
    title: "Armoor Dried Red Chilli",
    description: "The Armoor chilli is known for its deep red color and balanced heat, the Armoor chilli is a premium variety that enhances both the appearance and flavor of your dishes. Sourced from the fertile soils of Armoor, Telangana, this chilli is celebrated for its consistent quality and rich taste. Ideal for creating high-quality chilli powders, spice blends, and sauces, Armoor chillies are a favorite among chefs and culinary enthusiasts. Its vibrant color and moderate heat make it a top choice for those seeking to elevate their culinary creations with both visual appeal and robust flavor.",
    images: [
      "assets/images/armoor.jpeg",
      "assets/images/armoor1.jpg"
    ],
    features: [
      { feature: "Color", value: "Bright red with high color retention" },
      { feature: "Skin", value: "Smooth, thin skin" },
      { feature: "Shape", value: "Medium size, curved, pointed tip" },
      { feature: "Aroma", value: "Spicy & smoky undertone" },
      { feature: "Pungency", value: "High" },
      { feature: "Processing", value: "Sun-dried" },
      { feature: "Capsaicin Percentage", value: "0.3%" },
      { feature: "Length", value: "6-9 cm (2.3-3.5 inches)" },
      { feature: "Heat Level", value: "30,000 to 50,000 SHU" },
      { feature: "ASTA Color Value", value: "60-80" },
      { feature: "Moisture", value: "8-10%" }
    ]
  },
  {
    title: "Devanur Deluxe (DD) Dried Red Chilli",
    description: "The DD Chilli is a premium variety renowned for its intense heat and vibrant red color, ideal for those who crave bold and spicy flavors. Cultivated in the rich soils of Kurnool, Telangana, and Andhra Pradesh, this chilli is celebrated for its consistent quality and fiery heat. Perfect for spice blends, chilli powders, and hot sauces, the DD Chilli stands out with its dark red, semi-wrinkled appearance and robust flavor. It contains fewer seeds than other varieties and retains its thick, red, and spicy qualities even when crushed, making it a top choice for adding a powerful kick to your dishes.",
    images: [
      "assets/images/dd1.jpeg",
      "assets/images/dd2.jpg"
    ],
    features: [
      { feature: "Color", value: "Dark red" },
      { feature: "Skin", value: "Thick, slightly wrinkled skin" },
      { feature: "Shape", value: "Medium-sized, pointed shape" },
      { feature: "Aroma", value: "Strong with a hint of sweetness" },
      { feature: "Pungency", value: "Mild to moderate" },
      { feature: "Processing", value: "Sun-dried" },
      { feature: "Capsaicin Percentage", value: "0.5%" },
      { feature: "Length", value: "8-12 cm (3-4.7 inches)" },
      { feature: "Heat Level", value: "10,000 to 20,000 SHU" },
      { feature: "ASTA Color Value", value: "80-100" },
      { feature: "Moisture", value: "10-12%" }
    ]
  }
];

// products section
function createProductCard(product) {
  const productContainer = document.getElementById('product-box'); // Parent container for all products
  const productCardHTML = `
      <div class="product-info">
          <h2 class="product-title">${product.title}</h2>
          <p class="product-description">${product.description}</p>
      </div>

      <div class="product-card">
          <div class="product-img">
              <img src="${product.images[0]}" alt="${product.title}" class="img-responsive">
          </div>
          <div class="product-img">
              <img src="${product.images[1]}" alt="${product.title}" class="img-responsive">
          </div>
          <div class="product-img">
              <ul class="product-features">
                  ${product.features.map(feature => `<li><strong>${feature.feature}:</strong> ${feature.value}</li>`).join('')}
              </ul>
          </div>
      </div>
  `;

  if (productContainer) {
  // Append the HTML to the container
    productContainer.innerHTML += productCardHTML;
  }
}

// Call the function for each product
function createProductPageContent() {
  if (window.location.pathname.includes('products')) {
      // Call the function related to the product page
      products.forEach(product => createProductCard(product));
  }
}
createProductPageContent();

// google translate
document.addEventListener("DOMContentLoaded", function () {

  // Dynamically load Google Translate script
  function loadGoogleTranslateScript() {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
  }

  // Load the Google Translate script after the page loads
  loadGoogleTranslateScript();
});

// Define the googleTranslateElementInit function globally so that the API can access it
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'te,hi,kn,ta,ml,es',  // Telugu, Hindi, Kannada, Tamil, Malayalam, Spanish
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
  }, 'google_translate_element');
}

// Step 1: Define the badge data
const badgesData = [
  {
      icon: 'workspace_premium',
      title: 'Best Quality',
      description: 'Our premium red chillies are carefully selected to ensure the highest quality, delivering exceptional taste and strength. We guarantee great flavor in every batch.'
  },
  {
      icon: 'hub',
      title: 'Reliable Bulk Supplier',
      description: 'We consistently deliver high-quality red chillies and chilli powder in large quantities with reliable service. Our products are sourced directly from farmers at Guntur Mirchi Market Yard.'
  },
  {
      icon: 'currency_rupee_circle',
      title: 'Competitive Pricing',
      description: 'Get the best and lowest prices on high-quality red dry chillies. Enjoy exceptional value with our competitive pricing, without compromising on quality.'
  },
  {
      icon: 'monitoring',
      title: 'Daily Price Updates',
      description: 'We track dry chilli market prices daily, so you can stay informed with the latest live prices and updates from the Guntur Market Yard and always get the best deal.'
  },
  {
      icon: 'enterprise',
      title: 'Retail & Wholesale',
      description: 'Managed by Devika Exim and supported by Parvathi Chillies, our legacy of excellence in trading and exporting is your assurance of premium quality.'
  },
  {
      icon: 'bookmark_heart',
      title: 'Trusted & Reputable',
      description: 'Managed by Devika Exim and supported by Parvathi Chillies, our legacy of excellence in trading and exporting is your assurance of premium quality.'
  }
];

// Step 2: Create the function to generate badges

function generateBadges() {
  const badgesContainer = document.getElementById('badgesContainer');
  badgesData.forEach(badge => {
      const card = document.createElement('div');
      card.className = 'card';

      const iconBlock = document.createElement('div');
      iconBlock.className = 'icon-block';
      const icon = document.createElement('span');
      icon.className = 'material-symbols-outlined';
      icon.textContent = badge.icon;
      iconBlock.appendChild(icon);

      const title = document.createElement('h5');
      title.textContent = badge.title;

      const description = document.createElement('p');
      description.textContent = badge.description;

      card.appendChild(iconBlock);
      card.appendChild(title);
      card.appendChild(description);
      if (badgesContainer) {
        badgesContainer.appendChild(card);
      }
    });
}

// Step 3: Call the function to generate badges on page load
window.addEventListener('load', generateBadges);
// Fetch prices when the page loads
window.onload = fetchDailyPrices;