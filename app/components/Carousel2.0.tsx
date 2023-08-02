import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

export default class Carousel2 extends Component {
  render() {
    return (
      <div>
        <h2></h2>
        <Carousel>
          <div>
            <Image
              src="/Images/Elon.png"
              alt="image1"
              width={500}
              height={500}
            />
            <p className="legend1"></p>
          </div>
          <div>
            <Image src="/Images/Jo.png" alt="image2" width={500} height={500} />
            <p className="legend2"></p>
          </div>
          <div>
            <Image
              src="/Images/Messi1.png"
              alt="image3"
              width={500}
              height={500}
            />
            <p className="legend3"></p>
          </div>
          <div>
            <Image
              src="/Images/Messi2.png"
              alt="image4"
              width={500}
              height={500}
            />
            <p className="legend4"></p>
          </div>
          <div>
            <Image
              src="/Images/Messi3.png"
              alt="image5"
              width={500}
              height={500}
            />
            <p className="legend5"></p>
          </div>
        </Carousel>
      </div>
    );
  }
}
