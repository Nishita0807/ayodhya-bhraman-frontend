import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/gallery.css";

const imageSources = {
  AyodhyaMainTemple: [
    { name: 'Ram Janambhoomi', source: 'ramjanambhoomi.png' },
    { name: 'Treta K Thakur', source: 'tretakthakur.jpg' },
    { name: 'Raja Mandir', source: 'rajamandir.jpg' }
  ],
  HanumanGadi: [
    { name: 'Hanuman Garhi', source: 'hanumangarhi.jpg' },
    { name: 'Kanak Bhawan', source: 'kanakbhawan.jpg' },
    { name: 'Tulsi Samarak Bhawan', source: 'tulsisamarakbhawan.jpg' }
  ],
  SarayuNadi: [
    { name: 'Ram K Paidi', source: 'ramkpaidi.jpg' },
    { name: 'Tulsi Udyan', source: 'tulsiudyan.jpg' },
    { name: 'Sarayu Nadi', source: 'sarayunadu.jpg' }
  ]
};

function Gallery({ defaultOpen = ['AyodhyaMainTemple'], imageSource }) {
  const [categoryStates, setCategoryStates] = useState(() => {
    const initialStates = {};
    Object.keys(imageSources).forEach(category => {
      initialStates[category] = defaultOpen.includes(category);
    });
    return initialStates;
  });

  const toggleCategory = (category) => {
    setCategoryStates(prevState => {
      const newState = { ...prevState };
      newState[category] = !prevState[category];
      return newState;
    });
  };

  const handleDoubleClick = (category) => {
    setCategoryStates(prevState => {
      const newState = { ...prevState };
      newState[category] = !prevState[category];
      return newState;
    });
    window.location.href = `/travel?category=${category}`;
  };

  const handleClick = (imageName) => {
    console.log(imageName);
  };

  return (
    <div className="Gallery">
      {Object.keys(imageSources).map((category, index) => (
        <div key={index}>
          <div
            className="category"
            onClick={() => toggleCategory(category)}
            onDoubleClick={() => handleDoubleClick(category)}
          >
            {category}
          </div>
          {categoryStates[category] && (
            <div className="image-grid">
              {imageSources[category].map((image, idx) => (
                <Link
                  key={idx}
                  to={`/travel?imageSource=${image.source}`}
                  onClick={() => handleClick(image.source)}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div key={idx} className='image-with-name' >
                    <img src={require(`../images/${image.source}`)} alt={image.name} />
                    <div className="image-name">{image.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Gallery;
