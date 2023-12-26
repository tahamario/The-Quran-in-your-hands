import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import axios from 'axios';

function Quran() {
  const [suwar, setSuwar] = useState([]);
  const [surahSvg, setSurahSvg] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
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
    setCurrentIndex(1)
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
  }

  const goToNextSvg = () => {
    if (surahSvg.length > currentIndex + 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1));
    }

  };

  const goToPrevSvg = () => {
    if (1 < currentIndex) {
      setCurrentIndex((prevIndex) => (prevIndex - 1));
    }
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

      {surahSvg.length > 1 &&
        <div className='row mb-3'>
          <div className='col-12 text-center'>
            <img src={surahSvg[currentIndex]} alt={`Image ${currentIndex}`} width='100%' height={450} />
            <div className='text-center'>
              <button className='btn btn-outline-dark m-3' onClick={goToPrevSvg}>السابق</button>
              <button className='btn btn-outline-dark m-3' onClick={goToNextSvg}>التالي</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Quran