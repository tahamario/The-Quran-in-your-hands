import React, { useEffect, useRef, useState } from 'react'
import { Select } from 'antd';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import '../styles/Quran.css'

function Quran() {
  const [suwar, setSuwar] = useState([]);
  const [surahSvg, setSurahSvg] = useState([]);
  const { Option } = Select;

  const getSuwar = async () => {
    await axios.get(`/ayat_timing/soar?read=5`)
      .then(res => {
        setSuwar(res.data)
        getSurah(res.data[0]?.timing_link) //load al-fatiha directly
      })
      .catch(err => console.log(err))
  }

  const getSurah = async (surahLink) => {
    let data = [];
    await axios.get(surahLink)
      .then(res => data = res.data)
      .catch(err => console.log(err))

    // Remove duplicates and update the state
    let svgLinks = [];
    data.map(d => svgLinks.push(d.page))

    const uniqueLinksSet = new Set(svgLinks);
    const uniqueLinksArray = Array.from(uniqueLinksSet);
    setSurahSvg(uniqueLinksArray);
    swiperRef.current.slideTo(0); //reset the Swiper index
  }


  const swiperRef = useRef(null);

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
  };

  useEffect(() => {
    getSuwar()
  }, [])


  return (
    <div className='container'>
      <div className='row mb-3'>
        <div className='col-lg-12'>
          <label htmlFor="suwar" className='form-label'>اختر السورة</label>
          <Select
            id="suwar"
            name="suwar"
            showSearch
            style={{ width: '100%', display: 'block', color: '#000' }}
            placeholder="اختر السورة"
            onChange={getSurah}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {suwar && suwar.map((surah, index) => (
              <Option value={surah.timing_link} key={index}>{surah.name}</Option>
            ))}
          </Select>
        </div>
      </div>

      <div className='row mb-3'>
        <Swiper
          className="col-12 text-center"
          onSwiper={handleSwiperInit}
        >
          {
            surahSvg.map((surah, index) => (
              <div key={index} style={{ width:'100px'}}>
                <SwiperSlide>
                <img src={surah ? surah : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/%D8%A7%D9%84%D9%82%D8%B1%D8%A7%D9%86_%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85_-_%D8%B4%D8%B9%D8%A7%D8%B1_%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86_%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85_-_%D9%84%D9%88%D8%BA%D9%88_%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86_%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85_-_logo_quran.svg/512px-%D8%A7%D9%84%D9%82%D8%B1%D8%A7%D9%86_%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85_-_%D8%B4%D8%B9%D8%A7%D8%B1_%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86_%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85_-_%D9%84%D9%88%D8%BA%D9%88_%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86_%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85_-_logo_quran.svg.png'} alt={`Image ${index}`} width='90%' height={400} />
              </SwiperSlide>
              </div>
            ))
          }
          <div className='text-center mt-5'>
            <button onClick={() => swiperRef.current.slideNext()} className="btn btn-outline-dark m-3">
              Next
            </button>
            <button onClick={() => swiperRef.current.slidePrev()} className="btn btn-outline-dark m-3">
              Prev
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  )
}

export default Quran