import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/book.css"
import hanumanImage from "../images/hanuman.jpg"; // Assuming hanuman.jpg is the image file
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const hanumanChalisa = [
  "श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।",
  "बरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥",
  "बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।",
  "बल बुद्धि बिद्या देहु मोहिं, हरहु कलेस विकार॥",
  "जय हनुमान ज्ञान गुन सागर।",
  "जय कपीश तिहुँलोक उजागर॥",
  "रामदूत अतुलित बल धामा।",
  "अंजनि-पुत्र पवनसुत नामा॥",
  "महाबीर बिक्रम बजरंगी।",
  "कुमति निवार सुमति के संगी॥",
  "कञ्चन वरण विराज सुबेसा।",
  "कानन कुंडल कुंचित केसा॥",
  "हाथ वज्र औ ध्वजा विराजै।",
  "काँधे मूँज जनेऊ साजै॥",
  "शंकर सुवन केसरी नंदन।",
  "तेज प्रताप महा जग वंदन॥",
  "विद्यावान गुणी अति चातुर।",
  "राम काज करिबे को आतुर॥",
  "प्रभु चरित्र सुनिबे को रसिया।",
  "राम लखन सीता मन बसिया॥",
  "सूक्ष्म रूप धरि सियहिं दिखावा।",
  "विकट रूप धरि लंक जरावा॥",
  "भीम रूप धरि असुर सँहारे।",
  "रामचंद्र के काज सँवारे॥",
  "लाय सजीवन लखन जियाये।",
  "श्रीरघुवीर हरषि उर लाये॥",
  "रघुपति कीन्हीं बहुत बड़ाई।",
  "तुम मम प्रिय भरतहि सम भाई॥",
  "सहस बदन तुम्हरो जस गावैं।",
  "अस कहि श्रीपति कंठ लगावैं॥",
  "सनकादिक ब्रह्मादि मुनीसा।",
  "नारद सारद सहित अहीसा॥",
  "यम कुबेर दिगपाल जहाँ ते।",
  "कवि कोविद कहि सकैं कहाँ ते॥",
  "तुम उपकार सुग्रीवहि कीन्हा।",
  "राम मिलाय राजपद दीन्हा॥",
  "तुम्हरो मंत्र विबीशन माना।",
  "लंकेश्वर भए सब जग जाना॥",
  "जुग सहस्र जोजन पर भानू।",
  "लील्यो ताहि मधुर फल जानू॥",
  "प्रभु मुद्रिका मेलि मुख माही।",
  "जलधि लांघि गये अचरज नाही॥",
  "दुर्गम काज जगत के जेते।",
  "सुगम अनुग्रह तुम्हरे तेते॥",
  "राम दुआरे तुम रखवारे।",
  "होत न आज्ञा बिनु पैसारे॥",
  "सब सुख लहैं तुम्हारी सरना।",
  "तुम रच्छक काहू को डर ना॥",
  "आपन तेज सम्हारो आपै।",
  "तीनों लोक हाँक तें काँपै॥",
  "भूत पिसाच निकट नहिं आवै।",
  "महाबीर जब नाम सुनावै॥",
  "नासै रोग हरै सब पीरा।",
  "जपत निरंतर हनुमत बीरा॥",
  "संकट तें हनुमान छुड़ावै।",
  "मन क्रम बचन ध्यान जो लावै॥",
  "सब पर राम तपस्वी राजा।",
  "तिन के काज सकल तुम साजा॥",
  "और मनोरथ जो कोई लावै।",
  "सोई अमित जीवन फल पावै॥",
  "चारों युग परताप तुम्हारा।",
  "है परसिद्ध जगत उजियारा॥",
  "साधु संत के तुम रखवारे।",
  "असुर निकंदन राम दुलारे॥",
  "अष्टसिद्धि नौ निधि के दाता।",
  "अस बर दीन्ह जानकी माता॥",
  "राम रसायन तुम्हरे पासा।",
  "सदा रहो रघुपति के दासा॥",
  "तुम्हरे भजन राम को पावै।",
  "जनम जनम के दुख बिसरावै॥",
  "अंत काल रघुबर पुर जाई।",
  "जहाँ जन्म हरिभक्त कहाई॥",
  "और देवता चित्त न धरई।",
  "हनुमत सेई सर्व सुख करई॥",
  "संकट कटै मिटै सब पीरा।",
  "जो सुमिरै हनुमत बलबीरा॥",
  "जय जय जय हनुमान गोसाईं।",
  "कृपा करहुं गुरुदेव की नाईं॥",
  "जो सत बार पाठ कर कोई।",
  "छूटहि बंदि महा सुख होई॥",
  "जो यह पढ़ै हनुमान चालीसा।",
  "होय सिद्धि साखी गौरीसा॥",
  "तुलसीदास सदा हरि चेरा।",
  "कीजै नाथ हृदय महँ डेरा॥",
  "दोहा॥",
  "पवनतनय संकट हरण मंगल मूरति रूप।",
  "राम लखन सीता सहित हृदय बसहु सुरभूप॥"
];


// Divide the Hanuman Chalisa into groups of four elements each
const pagesContent = [];
for (let i = 0; i < hanumanChalisa.length; i += 4) {
  pagesContent.push(hanumanChalisa.slice(i, i + 4));
}

const Book = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pagesContent.length - 1));
  };

  return (
    <div style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, rotateX: -90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        exit={{ opacity: 0, rotateX: 90 }}
        transition={{ duration: 1 }}
        style={{ perspective: 1000}}
      >
        <div className="Book" style={{  backgroundImage: `url(${hanumanImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {pagesContent[currentPage].map((verse, index) => (
  <p key={index} style={{ textAlign: "justify" }} translate="no" className="book-para">
    {verse.split("").map((char, charIndex) => (
      <motion.span
        key={charIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 * charIndex }}
      >
        {char}
      </motion.span>
    ))}
  </p>
))}
        </div>
      </motion.div>
      <div style={{ display:"flex",flexDirection:"column",gap:"10px",textAlign: "center", marginTop: "20px" }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 0} className="book-button">
          <KeyboardArrowUpIcon/>
        </button>
        <button onClick={goToNextPage} disabled={currentPage === pagesContent.length - 1} className="book-button" >
        <KeyboardArrowDownIcon/>
        </button>
      </div>
    </div>
  );
};

export default Book;
