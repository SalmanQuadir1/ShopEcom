import React from 'react'

const BannerCarousel = () => {
    return (
        <>
            {/* <div>
            <img className='w-100 ' src={'/images/banner2.jpg'} alt="banner" height={500} />
        </div> */}

            <div id="carouselExampleInterval" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-interval="1000">
                        <img src="/images/banner2.jpg" className="d-block w-100" alt="IMG" height={400} />
                    </div>
                    <div className="carousel-item" data-interval="1000">
                        <img src="/images/ecom1banner.jpg" className="d-block w-100" alt="IMG" height={400} />
                    </div>
                    {/* <div className="carousel-item">
                        <img src="..." className="d-block w-100" alt="..." />
                    </div> */}
                </div>
                {/* <button className="carousel-control-prev" type="button" data-target="#carouselExampleInterval" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-target="#carouselExampleInterval" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button> */}
            </div>
        </>
    )
}

export default BannerCarousel