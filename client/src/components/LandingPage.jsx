import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin, FaFacebookSquare, FaFacebookMessenger } from 'react-icons/fa';
import dogVideov1 from '../videos/dogs-playing-in-the-park.mp4';
import dogVideov2 from '../videos/a-dog-panting-outdoors.mp4';
import dogVideov3 from '../videos/border-collie-dog-drinking-water.mp4';
import dogVideov4 from '../videos/border-collie-playing-with-owner.mp4';
import dogVideov5 from '../videos/cute-dog.mp4';
import dogVideov6 from '../videos/dog-on-a-farm.mp4';
import dogVideov7 from '../videos/dog-on-the-beach.mp4';
import dogVideov8 from '../videos/dog-sleeping-in-a-shelter.mp4';
import dogVideov9 from '../videos/dog-trying-to-catch-a-fly.mp4';
import dogVideov10 from '../videos/poodle-out-of-a-car-window.mp4';
import './styles.css';

function LandingPage() {
    const videos = [
        dogVideov1, dogVideov2, dogVideov3, dogVideov4, dogVideov5,
        dogVideov6, dogVideov7, dogVideov8, dogVideov9, dogVideov10,

    ];
    let videoIndex = Math.floor(Math.random()*videos.length);
    
    return (
        <section className="showcase">
        <header id="header-landing">
          <h2 className="logo">The DogApi Web App</h2>
        </header>
        <video muted loop autoPlay>
            <source src={videos[videoIndex]} type="video/mp4" />
        </video>
        <div className="overlay"></div>
        <div className="text">
          <h2>Don't Stop</h2> 
          <h3>Dive Into The Wog's World</h3>
          <p>On our site, you can search for dogs by name or breed. 
            Whether you are looking for a specific dog or just want 
            to explore different breeds, we are here to help. With our 
            extensive dog database, you can find detailed information 
            about each breed, characteristics, temperament and much more. 
            Our goal is to provide you with the best experience when searching 
            for dog information and help you find the perfect companion for you 
            and your family.</p>
          <Link to="/home">Explore <FaArrowRight /></Link>
        </div>
        <ul className="social">
            <li><Link to="https://github.com/DETNAW11"><FaGithub /></Link></li>
            <li><Link to="https://www.linkedin.com/in/luis-alejandro-prieto-torres-992600261/"><FaLinkedin /></Link></li>
            <li><Link to="https://www.facebook.com/luisalejandro.prieto.12"><FaFacebookSquare /></Link></li>
            <li><Link to=""><FaFacebookMessenger /></Link></li>
        </ul>
        </section>
    );
};

export default LandingPage;