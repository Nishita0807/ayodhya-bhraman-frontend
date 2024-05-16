
import React, { useEffect, useMemo, useState } from 'react';
import CardList from './travelComponents/CardList';
import Map from './travelComponents/Map'; // Import the Map component
import "../styles/travel.css";
import { useLocation } from 'react-router-dom';

function Travel() {

  const jsonData = useMemo(() => [
    { id: 1,category:"Ayodhya Main Temple", name: 'Ram Janambhoomi', latitude: 26.795850391497826, longitude: 82.1941521764784,
    source: 'ramjanambhoomi.png',content:"The history of Ram Janmabhoomi is deeply intertwined with the religious and cultural fabric of India. According to Hindu belief, Ram Janmabhoomi is the birthplace of Lord Ram, a central figure in the Hindu epic Ramayana and revered as the seventh avatar of Lord Vishnu. The site, located in Ayodhya, Uttar Pradesh, has been a focal point of contention and reverence for centuries.Historically, Ayodhya has been considered a sacred city in Hinduism, associated with the rule of King Dasharatha and the birth of Lord Ram. However, the modern controversy surrounding Ram Janmabhoomi gained prominence in the 20th century. The Babri Masjid, a mosque believed to have been constructed by Mughal emperor Babur in the 16th century, stood at the site.Tensions over the ownership of the land escalated in the 20th century, leading to a protracted legal and political battle. The dispute reached its peak on December 6, 1992, when the Babri Masjid was demolished by Hindu nationalist groups, sparking communal riots across India and leading to significant loss of life. The demolition of the mosque intensified the religious and political divide in India and triggered legal battles over the ownership of the land. In 2019, the Supreme Court of India delivered a landmark verdict, ruling that the disputed land should be handed over to a trust to facilitate the construction of a Hindu temple, while also allocating an alternative plot of land for the construction of a mosque. The verdict marked a significant milestone in the Ram Janmabhoomi-Babri Masjid dispute, seeking to resolve a decades-long conflict through a legal framework. However, the dispute remains deeply emotive and continues to evoke strong sentiments among various segments of society, reflecting the complex interplay of religion, history, and politics in India." },
    { id: 2,category:"Sarayu Nadi", name: 'Ram ki Paidi', latitude: 26.809345650260656, longitude:  82.20607934118806 ,source: 'ramkpaidi.jpg',content:"Ram Ki Paidi, also known as Saryu Ghats, holds significant historical and cultural importance in the city of Ayodhya, India. This revered site is believed to be the very place where Lord Rama, an incarnation of the Hindu god Vishnu, spent a considerable portion of his life. According to the Hindu epic Ramayana, Ayodhya was the capital of the ancient kingdom of Kosala, ruled by King Dasharatha, Lord Rama's father.Ram Ki Paidi is situated on the banks of the sacred Sarayu River, which flows through Ayodhya. It is here that many pivotal events from the Ramayana are said to have taken place, including Lord Rama's coronation ceremony and his departure from Ayodhya for his exile in the forest.The term PAIDI refers to the steps leading down to the river, where devotees perform various rituals and ceremonies, including offering prayers and taking holy dips in the river's purifying waters. It is believed that bathing in the Sarayu River at Ram Ki Paidi can cleanse one's sins and bring spiritual purification.Throughout history, Ram Ki Paidi has been a center of religious and cultural activities, attracting pilgrims and tourists from all over India and beyond. It remains a cherished destination for devotees seeking to connect with the divine and immerse themselves in the timeless tales of Lord Rama life and teachings."},
    { id: 3,category:"Ayodhya Main Temple", name: 'Raja Mandir', latitude:26.796159226275364, longitude:  82.20191477767744,source: 'rajamandir.jpg',content:"Raja Mandir, located in Ayodhya, Uttar Pradesh, India, holds significant historical and cultural importance. It stands as a testament to the rich heritage of the region and its diverse architectural marvels. Believed to have been constructed during the reign of Raja Man Singh of Amer, Raja Mandir has endured centuries of history, witnessing the ebb and flow of various dynasties and civilizations. The temple is renowned for its intricate design, blending elements of Rajput and Mughal architectural styles, showcasing exquisite craftsmanship and detailing. It is dedicated to Lord Rama, a revered deity in Hindu mythology, and attracts pilgrims and tourists alike from all corners of the globe. Over the years, Raja Mandir has been a focal point for religious ceremonies, festivals, and cultural events, serving as a symbol of spiritual harmony and unity. Despite facing challenges and periods of neglect, efforts have been made to preserve and restore its grandeur, ensuring that it continues to stand as a timeless symbol of faith, history, and cultural heritage for generations to come." },
    {id:4,category:"Ayodhya Main Temple",name:"Treta k Thakur",latitude:26.81040542530638,longitude: 82.20752538160012,source:"tretakthakur.jpg",content:"The Trtanath Mandir, also known as the Trikutachal Temple, stands as a timeless testament to the devout reverence and ancient heritage of Ayodhya, Uttar Pradesh, India. Dedicated to Lord Rama, the revered seventh avatar of the Hindu deity Vishnu, this sacred sanctuary is steeped in both religious sanctity and historical significance.Its origins shrouded in the mists of time, the Trtanath Mandir is believed to have graced Ayodhya's landscape for countless generations, embodying the enduring devotion of Hindu worshippers across the ages. Adorned with the intricate carvings and majestic spires characteristic of traditional Hindu temple architecture, it serves as a sublime testament to the rich cultural tapestry of India.Ayodhya, the birthplace of Lord Rama according to Hindu mythology, holds a special place in the hearts of devout pilgrims who flock to its sacred precincts seeking solace and spiritual fulfillment. The Trtanath Mandir, with its hallowed halls and sanctified shrines, beckons the faithful from far and wide, offering a sanctuary of peace and devotion amidst the bustling city.Beyond its religious significance, the Trtanath Mandir is a cherished symbol of India's ancient cultural heritage, embodying the timeless traditions and profound spiritual wisdom of the land. Its festivals, rituals, and ceremonies resonate with the echoes of centuries past, enriching the cultural fabric of Ayodhya and inspiring awe and reverence in all who visit."},
  {id:5,category:"Sarayu Nadi",name:"Tulsi Udyan",latitude:26.807690523903627,longitude:82.20781580432805,source: 'tulsiudyan.jpg',content:"Tulsi Udyan, located in Ayodhya, holds a rich historical significance deeply intertwined with the cultural fabric of the region. The garden stands as a serene testament to the revered poet-saint Tulsidas, who is celebrated for his monumental work, the Ramcharitmanas. Embraced by lush greenery and tranquil surroundings, Tulsi Udyan serves not only as a botanical oasis but also as a pilgrimage site for devotees of Lord Rama. Its inception dates back to centuries ago, resonating with the echoes of devotion and literary excellence. Tulsidas, believed to have spent considerable time in Ayodhya during the 16th century, is said to have found solace and inspiration amidst the natural beauty of this very land. Tulsi Udyan, therefore, encapsulates not just the splendor of nature but also the spiritual aura fostered by Tulsidas' presence. Over time, the garden has evolved into a cherished retreat for locals and visitors alike, offering a tranquil escape from the hustle and bustle of everyday life. Its pathways, adorned with vibrant flora and ancient trees, narrate tales of bygone eras and inspire contemplation. Tulsi Udyan stands as a living monument to Tulsidas' legacy, inviting all who enter to immerse themselves in its beauty, spirituality, and historical significance, thus perpetuating the timeless bond between literature, devotion, and nature in the heart of Ayodhya."},
  {id:6,category:"Sarayu Nadi",name: 'Sarayu Nadi',latitude:27.087512590764117,longitude: 81.49318682786125, source: 'sarayunadu.jpg',content:"The Sarayu River, with its timeless flow, bears witness to the rich historical tapestry of Ayodhya, a city steeped in mythological and cultural significance. This ancient river has been mentioned in various Hindu scriptures, including the Ramayana, where it holds a central place in the epic narrative. Ayodhya, situated on the banks of the Sarayu, is revered as the birthplace of Lord Rama, one of the most revered figures in Hinduism. The river thus holds deep religious importance, serving as a symbol of purity and spirituality. Throughout history, Ayodhya has been a thriving center of art, culture, and philosophy, attracting scholars, saints, and devotees from far and wide. Its association with the Ramayana has drawn pilgrims for millennia, fostering a vibrant tradition of devotion and worship along its sacred shores. Over the centuries, Ayodhya has witnessed the rise and fall of empires, including the Mauryas, Guptas, and Mughals, each leaving their mark on its storied landscape. Despite periods of turmoil and conflict, the spiritual aura of Ayodhya has remained unblemished, with the Sarayu River continuing to flow serenely through the heart of this ancient city, carrying with it the echoes of countless tales and legends. Today, Ayodhya stands as a symbol of resilience and harmony, where the past and present converge in a celebration of faith, heritage, and the eternal flow of the Sarayu."},
{id:7,category:"Hanuman Gadi",name: 'Hanuman Garhi', source: 'hanumangarhi.jpg',latitude:26.79547661077114,longitude: 82.20162715465466,content:'Hanuman Garhi, located in Ayodhya, Uttar Pradesh, is a significant religious site revered by millions of devotees worldwide. Perched atop a hillock, this ancient temple is dedicated to Lord Hanuman, the mighty monkey god known for his unwavering devotion to Lord Rama. The temple complex boasts a remarkable architecture, featuring imposing walls and multiple entry gates adorned with intricate carvings depicting scenes from the epic Ramayana. Legend has it that the temple was established by a saint named Baba Ballak Das, who was a devout follower of Lord Hanuman. The main sanctum of Hanuman Garhi houses a towering idol of Lord Hanuman in a sitting posture, adorned with vibrant floral garlands and offerings from devotees. Pilgrims flock to this sacred site throughout the year, especially on Tuesdays and Saturdays, considered auspicious days for worshipping Lord Hanuman. The temple ambiance resonates with the melodious chants of hymns and the rhythmic beats of drums, creating a serene and spiritual atmosphere. Apart from its religious significance, Hanuman Garhi also holds historical importance, with many ancient scriptures and inscriptions found in the vicinity, offering insights into its rich heritage. Visitors can also explore the surrounding area, which includes various shrines, meditation spots, and picturesque viewpoints offering panoramic vistas of Ayodhya city. As a symbol of devotion and faith, Hanuman Garhi stands as a beacon of spiritual enlightenment, drawing devotees from far and wide to seek blessings and solace in the divine presence of Lord Hanuman.'},
{id:8,category:"Hanuman Gadi",name: 'Kanak Bhawan', source: 'kanakbhawan.jpg',latitude:26.79851885186873, longitude:82.19918484379443,content:'Kanak Bhawan, situated in the historic city of Ayodhya, holds profound significance in Hindu mythology and architectural heritage. Constructed during the reign of the illustrious King Vikramaditya of the Chandra dynasty, this grand temple is dedicated to the divine deities Lord Rama and Goddess Sita. The history of Kanak Bhawan is intertwined with the epic Ramayana, as it is believed to be the divine gift presented by Lord Rama to his beloved consort Sita during their wedding ceremony. The name "Kanak Bhawan" translates to "Golden Palace," indicative of its opulent splendor and intricate craftsmanship. Over the centuries, the temple has undergone several renovations and expansions, each contributing to its architectural marvel and spiritual allure. Kanak Bhawan stands as a testament to the enduring devotion and reverence towards Lord Rama and Goddess Sita, attracting pilgrims and tourists alike who seek solace and blessings in this sacred abode. Its ornate facade, adorned with intricate carvings and vibrant murals depicting scenes from Hindu mythology, mesmerizes visitors and transports them to a realm of divine grace and tranquility. Today, Kanak Bhawan remains a cherished symbol of faith and cultural heritage, preserving the timeless legacy of Ayodhya and its profound connection to the epic saga of Lord Rama.'},
{id:9,category:"Hanuman Gadi",name: 'Tulsi Samarak Bhawan', source: 'tulsisamarakbhawan.jpg',latitude:26.795394535272614, longitude:82.2048371607711,content:"Tulsi Samarak Bhawan in Ayodhya is a significant historical landmark deeply intertwined with the cultural fabric of India. This architectural marvel stands as a tribute to one of India's most revered poets, Goswami Tulsidas, who penned the epic Ramcharitmanas, an embodiment of devotion to Lord Rama. The Bhawan, nestled in the heart of Ayodhya, Uttar Pradesh, showcases the life and works of Tulsidas, offering visitors a profound insight into his literary contributions and spiritual legacy. Its grandeur and serenity echo the timeless verses that continue to resonate with devotees across generations. As pilgrims wander through its corridors adorned with exquisite murals depicting scenes from the Ramayana, they are transported into the world of Tulsidas, where devotion intertwines with poetic brilliance. The Bhawan serves as a pilgrimage site for millions who seek solace and inspiration in Tulsidas' teachings, fostering a deep sense of reverence and cultural pride. Amidst the sacred atmosphere of Ayodhya, Tulsi Samarak Bhawan stands as a testament to the enduring legacy of Tulsidas and his immortal devotion to Lord Rama, enriching the cultural heritage of India for centuries to come."}


], []);


const [currentLocation, setCurrentLocation] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const [clickedImage, setClickedImage] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const imageSource = searchParams.get('imageSource');
    setClickedImage(imageSource);
    const category = searchParams.get('category');
    if (category) {
      const categoryFormatted = category.replace(/([a-z0-9])([A-Z])/g, '$1 $2'); // Add spaces between camelCase words
      setFilterCategory(categoryFormatted);
    }
  }, [location]);
  console.log(clickedImage);
  useEffect(() => {
    if (clickedImage) {
      const matchingImage = jsonData.find(image => image.source === clickedImage);
      if (matchingImage) {
        setFilteredData([matchingImage]);
      } else {
        setFilteredData(jsonData);
      }
    } else if (filterCategory) {
      const filteredByCategory = jsonData.filter(item => item.category === filterCategory);
      setFilteredData(filteredByCategory);
    } else {
      setFilteredData(jsonData);
    }
  }, [clickedImage,jsonData,filterCategory]); 
  
  
  
  useEffect(() => {
   
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => {
        console.error('Error getting current location:', error);
      }
    );
  }, []);



  // Function to filter jsonData based on location name
 // Function to filter jsonData based on location name
// Function to filter jsonData based on location name and category
const filterDataByLocation = (locationName, category, removeSpaces = true) => {
  // Construct regex pattern to allow for matching words with spaces
  const regexPatternWithSpaces = '\\b' + locationName.split(' ').join('\\s*') + '\\b'; // \b for word boundary, \s* for optional spaces
  const regexWithSpaces = new RegExp(regexPatternWithSpaces, 'i'); // 'i' flag for case-insensitive matching

  // Filter jsonData based on the regex pattern with spaces and category
  let filteredData = jsonData.filter(location => 
    regexWithSpaces.test(location.name) &&
    (!category || location.category === category) // Filter by category
  );

  // If no matches found with spaces, filter based on contiguous words without spaces
  if (filteredData.length === 0 && removeSpaces) {
    const contiguousLocationName = locationName.replace(/\s+/g, '');
    const regexPatternWithoutSpaces = contiguousLocationName.split('').join('.*'); // .* allows for missing characters
    const regexWithoutSpaces = new RegExp(regexPatternWithoutSpaces, 'i');

    // Filter jsonData based on the regex pattern without spaces and category
    filteredData = jsonData.filter(location => 
      regexWithoutSpaces.test(location.name.replace(/\s+/g, '')) &&
      (!category || location.category === category) // Filter by category
    );
  }
  
  // Update the state with the filtered data
  setFilteredData(filteredData);

  // Alert if no locations match the criteria
  if (filteredData.length === 0) {
    alert("No locations match the specified criteria.");
  }
};











 

  return (
    <div className='travel'>
        <div className="row">
          <div className="card-list-wrapper">
            {currentLocation && <CardList currentLocation={currentLocation} jsonData={jsonData} filterDataByLocation={filterDataByLocation} clickedImage={clickedImage} category={filterCategory} />}
          </div>
          <div id="map-container" className="map-container">
          <Map containerId="map-container" jsonData={filteredData.length===0?jsonData:filteredData} />
          </div>
        </div>
    </div>
  );
}

export default Travel;
