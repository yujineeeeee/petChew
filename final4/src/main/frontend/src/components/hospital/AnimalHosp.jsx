import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Maps from './Maps';
import './custom-styles.css';
import hospunique from '../../images/hospunique.png'
import banner from '../../images/banner.png'
import copyIcon from '../../images/copy.png'


function AnimalHosp(props) {
    const [hospList, setHospList] = useState([]);
    const [gugunList, setGugunList] = useState([]);
    const [selectedGugun, setSelectedGugun] = useState('');
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [selectedHospitalCoords, setSelectedHospitalCoords] = useState(null);
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        loadPetHosp();
    }, []);

    const loadPetHosp = () => {
        axios.get('https://apis.data.go.kr/6260000/BusanAnimalHospService/getTblAnimalHospital?serviceKey=YOzeVGoJYSR1PN%2B5IqHQH6wIfLYEzjF47b6KmktBZyO1%2FTuxYQzoljctFpIiscm%2F%2BkFmdSFiUn%2B6FcrvjEVggw%3D%3D&pageNo=1&numOfRows=279&resultType=json')
            .then(res => {
                const { getTblAnimalHospital } = res.data;
                const { body } = getTblAnimalHospital;
                const { items } = body;
                const { item } = items;

                const hospList = Array.isArray(item) ? item : [item];
                setHospList(hospList);

                const gugunNames = hospList.map(item => item.gugun);
                const uniqueGugunNames = Array.from(new Set(gugunNames));
                setGugunList(uniqueGugunNames);
            })
            .catch(err => {
                console.error('Error fetching hospital data:', err);
                alert('API 요청 중 오류가 발생했습니다.');
            });
    };

    const handleGugunClick = (gugun) => {
        setSelectedGugun(gugun);
        setShowMap(false);
    };

    const handleHospitalClick = (hospital) => {
        setSelectedHospital(hospital);
        setSelectedHospitalCoords({ lat: parseFloat(hospital.lat), lon: parseFloat(hospital.lon) });
        setShowMap(true);
        scrollToMap();
    };

    const scrollToMap = () => {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const alternativeHospitals = [
        '센트럴동물병원',
        '태종동물병원',
        '영도동물병원',
        '천동물병원'
    ];

    const filteredHospitals = selectedGugun ? hospList.filter(item => item.gugun === selectedGugun) : hospList;
    const totalHospitals = selectedGugun ? filteredHospitals.length : hospList.length;

    const getHospitalName = (hospital) => hospital ? hospital.animal_hospital : '';
    const getAlternativeHospitalName = (index) => alternativeHospitals[index % alternativeHospitals.length];

    const handleCopyClipBoard = async (text) => {
        try {
            await document.hasFocus();
            await navigator.clipboard.writeText(text);
            alert('클립보드에 복사되었습니다.');
        } catch (error) {
            alert('클립보드 복사에 실패하였습니다.');
        }
    };


    return (
        <div className={'main-container no-scroll  mt-3'}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {/*<h1 className={'hosptittle'} style={{textAlign: 'center', flex: '1'}}>*/}
                {/*    petChew에서 알려주는 <br/>*/}
                {/*    부산 동물병원 목록*/}
                {/*</h1>*/}
                <img className={'mx-auto'} src={banner} alt={"병원"} style={{float: 'center', marginLeft: '20px', width: '80%'}}/>
            </div>
            <div className={'my-3 d-flex flex-wrap'}>
                {gugunList.map((gugun, index) => (
                    gugun !== '' && (
                        <button key={index} className={'btn custom-buttona me-2 mb-2'}
                                onClick={() => handleGugunClick(gugun)}>🐶
                            {gugun.includes('부산광역시') ? gugun : `부산광역시 ${gugun}`}
                        </button>
                    )
                ))}
                <button type={'button'} className={'btn custom-button me-2 mb-2'} onClick={() => setSelectedGugun('')}>
                    🐱전체보기
                </button>
            </div>

            {showMap && selectedHospitalCoords && (
                <div id="map" className={'mt-4'}>
                    <h1 className={'hosptittles'}>{getHospitalName(selectedHospital) || getAlternativeHospitalName(filteredHospitals.indexOf(selectedHospital))}의
                        위치</h1>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%',
                            paddingRight: '10px' // 원하는 만큼 여백을 추가할 수 있습니다.
                        }}
                        onClick={() => handleCopyClipBoard(selectedHospital.road_address)}
                    >
                        <img src={copyIcon} alt={'복사하기'} style={{width: '3%', height: 'auto', maxWidth: '100%'}} className={'mb-2'}/>
                    </div>


                    <Maps location={selectedHospitalCoords}/>
                </div>
            )}

            <div className={'row'}>
                <div className={'col-sm mx-auto'}>
                    <hr className={'bHr'}/>
                    <div className={'col-sm mx-auto text-end'}>
                        <p>결과: 총 {totalHospitals}개</p>
                    </div>

                    <table className={'table table-hover table-striped hosptable'}>
                        <colgroup>
                        <col width={'20%'}/>
                            <col width={'15%'}/>
                            <col width={'50%'}/>
                            <col width={'25%'}/>
                            <col width={'30%'}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>병원명</th>
                            <th>구</th>
                            <th>주소</th>
                            <th>전화번호</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredHospitals.map((item, index) => (
                            <tr key={index} onClick={() => handleHospitalClick(item)}>
                                <td>{getHospitalName(item) || getAlternativeHospitalName(index)}</td>
                                <td>{item.gugun}</td>
                                <td>{item.road_address}</td>
                                <td>{item.tel}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AnimalHosp;
