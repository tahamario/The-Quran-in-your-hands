import React, { useEffect, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player';
import '../styles/Home.css'
import axios from 'axios';
import { Select } from 'antd';

function Home() {
    const [reciters, setReciters] = useState();
    const [moshafs, setMoshafs] = useState();
    const [suwar, setSuwar] = useState([]);
    const [selectedServer, setSelectedServer] = useState();
    const [surahToPlay, setSurahToPlay] = useState();
    const [channelUrl, setChannelUrl] = useState('https://win.holol.com/live/quran/playlist.m3u8');
    const [btnQuran,setBtnQuran] = useState('btn btn-dark m-2');
    const [btnSunna,setBtnSunna] = useState('btn btn-outline-dark m-2');

    const { Option } = Select;

    const getReciters = async () => {
        await axios.get('/reciters')
            .then(res => setReciters(res.data.reciters))
            .catch(err => console.log(err))
    }

    const getMoshafs = async (reciterId) => {
        await axios.get(`/reciters?language=ar&reciter=${reciterId}`)
            .then(res => setMoshafs(res.data.reciters[0].moshaf))
            .catch(err => console.log(err))
    }

    const getSuwar = async (value, option) => {
        setSelectedServer(option?.server)
        const surahListArray = option.surahlist.split(',');
        var suwarData = [];
        setSuwar([])

        await axios.get(`/suwar?language=ar`)
            .then(res => suwarData = res.data.suwar)
            .catch(err => console.log(err))

        surahListArray.forEach(surah => {
            suwarData.forEach(surahName => {
                if (surahName.id == surah) {
                    setSuwar(prev => [...prev, surahName])
                }
            })
        })
    }

    const handleSurahPlay = (surahPath) => {
        setSurahToPlay(surahPath);
        const audioElement = document.getElementById('audioPlayer');
        if (audioElement) {
            audioElement.load();
            audioElement.play();
        }
    }

    const btnHandleClick = (url,btn) => {
        setChannelUrl(url)
        if(btn == 'quran'){
            setBtnQuran('btn btn-dark m-2')
            setBtnSunna('btn btn-outline-dark m-2')
        }else{
            setBtnQuran('btn btn-outline-dark m-2')
            setBtnSunna('btn btn-dark m-2')
        }
    }

    useEffect(() => {
        getReciters()
    }, [])


    return (
        <div className='container'>
            <div className='row mb-3'>
                <div className='col-lg-4'>
                    <label htmlFor="reciters" className='form-label'>اختر القارئ</label>
                    <Select
                        id="reciters"
                        name="reciters"
                        showSearch
                        style={{ width: '100%', display: 'block', color: '#000' }}
                        placeholder="اختر القارئ"
                        onChange={getMoshafs}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {reciters && reciters.map((reciter, index) => (
                            <Option value={reciter.id} key={index}>{reciter.name}</Option>
                        ))}
                    </Select>
                </div>

                <div className='col-lg-4'>
                    <label htmlFor="moshafs" className='form-label'>اختر الرواية</label>
                    <Select
                        showSearch
                        style={{ width: '100%', display: 'block' }}
                        placeholder="اختر الرواية"
                        onChange={getSuwar}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {moshafs && moshafs.map((moshaf, index) => (
                            <Option
                                value={moshaf.id}
                                key={index}
                                server={moshaf.server}
                                surahlist={moshaf.surah_list} >
                                {moshaf.name}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className='col-lg-4'>
                    <label htmlFor="suwar" className="form-label">اختر السورة</label>
                    <Select
                        id="suwar"
                        name="suwar"
                        showSearch
                        style={{ width: '100%', display: 'block' }}
                        placeholder="اختر السورة"
                        onChange={handleSurahPlay}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {suwar && suwar.map((surah, index) => (
                            <Option value={selectedServer + String(surah.id).padStart(3, '0') + '.mp3 '} key={index}>{surah.name}</Option>
                        ))}
                    </Select>
                </div>
            </div>

            <div className='row mb-3'>
                <div className='col-12'>
                    <audio id="audioPlayer" controls autoPlay muted style={{ width: '100%' }}>
                        <source src={surahToPlay ? surahToPlay : ''} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>

            </div>

            <div className='video-control text-center pb-5'>
                <h3>اختر قناة البث</h3>
                <div className='mb-2'>
                    <button className={btnQuran} onClick={() => btnHandleClick('https://win.holol.com/live/quran/playlist.m3u8','quran')}>
                        قناة القرآن
                    </button>
                    <button className={btnSunna} onClick={() => btnHandleClick('https://win.holol.com/live/sunnah/playlist.m3u8','sunna')}>
                        قناة السنة
                    </button>
                </div>
                <ReactHlsPlayer
                    src={channelUrl}
                    hlsConfig={{
                        maxLoadingDelay: 6,
                        minAutoBitrate: 2,
                        lowLatencyMode: true,
                    }}
                    autoPlay={false}
                    controls={true}
                    width="80%"
                    height="50%"
                />
            </div>
        </div>
    )
}

export default Home