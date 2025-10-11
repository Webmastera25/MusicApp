// Content.tsx
'use client'

import Image from "next/image";
import styles from './content.module.css'
import Link from "next/link";

export function Content() {
    return (
      <main className={styles.main}>
            <div className={styles.daylistContainer}>
              <div className={styles.daylistText}>
                    <h1 className={styles.hit}>Hit of The Day</h1>
                    <p className={styles.name}>Actor</p>
                    <span className={styles.name}>Music Name</span>
              </div>
              <button className={styles.buttonListen}>Listen Now </button>
            </div>
      
            
           <div className={styles.hittContainer}>
                  <div className={styles.topHits}>
                        <div className={styles.topTexts}>
                             <h1 className={styles.name}>Top Hits</h1>  
                             <Link href="/seeall" className={styles.names}>seeAll</Link>
                        </div>

                        <div className={styles.topCards}>
                            <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-1.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                            </div>

                            <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-2.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                            </div>

                            <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-3.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                            </div>

                            <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-4.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                            </div>
                        </div>
                  </div>
                  

                  <div className={styles.topCharts}>
                        <div className={styles.chartBox}>
                              <h3 className={styles.name}>top chart</h3>
                              <Link href="/seeall" className={styles.names}>seeAll</Link>
                        </div>

                        <div className={styles.minicardBox}>
                            <div className={styles.miniCard}>
                                <span className={styles.number}>01</span>
                                <Image
                                          src="/image/cards/minicard-1.jpg"
                                          alt="Star"
                                          width={80}
                                          height={70}
                                          border-radius={20}
                                          style={{ borderRadius: "5px" }}
                                        />   


                                <p className={styles.name}>Actor</p>
                                <span className={styles.chartText}>Music Name</span>  
                                <Image
                                      src="/image/cards/Star.svg"
                                      alt="Star"
                                      width={30}
                                      height={30}
                                    />       
                            </div>

                            <div className={styles.miniCard}>
                                <span className={styles.number}>02</span>
                                <Image
                                          src="/image/cards/minicard-2.jpg"
                                          alt="Star"
                                          width={80}
                                          height={70}
                                          border-radius={20}
                                          style={{ borderRadius: "5px" }}
                                        />   


                                <p className={styles.name}>Actor</p>
                                <span className={styles.chartText}>Music Name</span>  
                                <Image
                                      src="/image/cards/Star.svg"
                                      alt="Star"
                                      width={30}
                                      height={30}
                                    />       
                            </div>

                            <div className={styles.miniCard}>
                                <span className={styles.number}>03</span>
                                <Image
                                          src="/image/cards/minicard-3.jpg"
                                          alt="Star"
                                          width={80}
                                          height={70}
                                          border-radius={20}
                                          style={{ borderRadius: "5px" }}
                                        />   


                                <p className={styles.name}>Actor</p>
                                <span className={styles.chartText}>Music Name</span>  
                                <Image
                                      src="/image/cards/Star.svg"
                                      alt="Star"
                                      width={30}
                                      height={30}
                                    />       
                            </div>

                            <div className={styles.miniCard}>
                                <span className={styles.number}>04</span>
                                <Image
                                          src="/image/cards/minicard-4.jpg"
                                          alt="Star"
                                          width={80}
                                          height={70}
                                          border-radius={20}
                                          style={{ borderRadius: "5px" }}
                                        />   


                                <p className={styles.name}>Actor</p>
                                <span className={styles.chartText}>Music Name</span>  
                                <Image
                                      src="/image/cards/Star.svg"
                                      alt="Star"
                                      width={30}
                                      height={30}
                                    />       
                            </div>
                        </div>
                  </div>
           </div>


            <div className={styles.topalbum}>
                              <div className={styles.albumhead}>
                                    <h1 className={styles.name}>top album</h1>
                              </div>
                              <div className={styles.musicadd}>

                              <div className={styles.topCards}>
                            <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-1.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                            </div>

                            <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-2.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                            </div>

                            <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-1.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                            </div>

                            <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-3.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                            </div>

                            <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-4.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                            </div>

                              <div className={styles.cards}>
                                <Image
                                      src="/image/cards/card-1.jpg"
                                      alt="Star"
                                      width={200}
                                      height={300}
                                      border-radius={20}
                                      style={{ borderRadius: "20px" }}
                                    />   

                                    <h4 className={styles.name}>Singer Name</h4>
                                    <span className={styles.musicName}>Music Name</span>
                              </div>
                        </div>
                  </div>
            </div>
            

            <div className={styles.musicContainer}>
                  <div className={styles.artistBox}>
                        <div className={styles.popArtist}>
                              <div className={styles.popHead}> 
                                    <h3>popular artist</h3>
                                    <span>see all</span>
                              </div>
                              <div className={styles.popularBox}>
                                   <div className={styles.popArt}>
                                          <Image src="/image/popArt/adriano.png" alt="Adriano" width={98} height={98} />
                                          <span className={styles.artName}>adriano celentano</span>
                                   </div>
                                   <div className={styles.popArt}>
                                          <Image src="/image/popArt/steve.png" alt="Adriano" width={98} height={98} />
                                          <span className={styles.artName}>adriano celentano</span>
                                   </div>
                                   <div className={styles.popArt}>
                                          <Image src="/image/popArt/whitney.png" alt="Adriano" width={98} height={98} />
                                          <span className={styles.artName}>adriano celentano</span>
                                   </div>
                                   <div className={styles.popArt}>
                                          <Image src="/image/popArt/aloe.png" alt="Adriano" width={98} height={98} />
                                          <span className={styles.artName}>adriano celentano</span>
                                   </div>
                                   <div className={styles.popArt}>
                                          <Image src="/image/popArt/elvis.png" alt="Adriano" width={98} height={98} />
                                          <span className={styles.artName}>adriano celentano</span>
                                   </div>
                                   <div className={styles.popArt}>
                                          <Image src="/image/popArt/michael.png" alt="Adriano" width={98} height={98} />
                                          <span className={styles.artName}>adriano celentano</span>
                                   </div>
                              </div>
                                    <>
                                          <div className={styles.playlistBox}>
                                                <h3>your playlist</h3>
                                                <span>see all</span>
                                          </div>
                                          <div className={styles.playlist}>
                                                <div className={styles.youPlay}>
                                                      <span>01</span>
                                                      <div className={styles.playlists}>
                                                            <Image src="/image/yourPlaylist/playlist-1.png" alt="damian marley" width={294} height={121} />
                                                            <h4 className={styles.name}>Singer Name</h4>
                                                            <span className={styles.musicName}>Music Name</span>
                                                      </div>
                                                </div>
                                               <div className={styles.youPlay}>
                                                     <span>02</span>
                                                     <div className={styles.plailists}>
                                                            <Image src="/image/yourPlaylist/playlist-1.png" alt="damian marley" width={183} height={121} />
                                                            <h4 className={styles.name}>Singer Name</h4>
                                                            <span className={styles.musicName}>Music Name</span>
                                                      </div>
                                               </div>
                                               <div className={styles.youPlay}>
                                                      <span>03</span>
                                                      <div className={styles.playlists}>
                                                            <Image src="/image/yourPlaylist/playlist-1.png" alt="damian marley" width={183} height={121} />
                                                            <h4 className={styles.name}>Singer Name</h4>
                                                            <span className={styles.musicName}>Music Name</span>
                                                      </div>
                                                </div>
                                               <div className={styles.youPlay}>
                                                     <span>04</span>
                                                     <div className={styles.plailists}>
                                                            <Image src="/image/yourPlaylist/playlist-1.png" alt="damian marley" width={294} height={121} />
                                                            <h4 className={styles.name}>Singer Name</h4>
                                                            <span className={styles.musicName}>Music Name</span>
                                                      </div>
                                               </div>
                                               <div className={styles.youPlay}>
                                                      <span>05</span>
                                                      <div className={styles.playlists}>
                                                            <Image src="/image/yourPlaylist/playlist-1.png" alt="damian marley" width={294} height={121} />
                                                            <h4 className={styles.name}>Singer Name</h4>
                                                            <span className={styles.musicName}>Music Name</span>
                                                      </div>
                                                </div>
                                               <div className={styles.youPlay}>
                                                     <span>06</span>
                                                     <div className={styles.plailists}>
                                                            <Image src="/image/yourPlaylist/playlist-1.png" alt="damian marley" width={200} height={120} />
                                                            <h4 className={styles.name}>Singer Name</h4>
                                                            <span className={styles.musicName}>Music Name</span>
                                                      </div>
                                               </div>
                                          
                                          </div>
                                          
                                    </>
                        </div>

                        <div className={styles.weeklyBox}>
                              <h3>weekly</h3>
                              <div className={styles.weekly}>
                                    <div className={styles.weeklyHit}>
                                                <Image 
                                                      src="/image/weeklyHits/celendion.png" 
                                                      alt="celendion" 
                                                      width={310} 
                                                      height={138} 
                                                      style={{ borderRadius: "12px",}}/>
                                                <h4 className={styles.name}>all by my self</h4>
                                                <span className={styles.musicName}>selen dion</span>
                                          </div>
                                          <div className={styles.weeklyHit}>
                                                <Image 
                                                      src="/image/weeklyHits/celendion.png" 
                                                      alt="celendion" 
                                                      width={200} 
                                                      height={138} 
                                                      style={{ borderRadius: "12px",}}/>
                                                <h4 className={styles.name}>all by my self</h4>
                                                <span className={styles.musicName}>selen dion</span>
                                          </div>
                                          <div className={styles.weeklyHit}>
                                                <Image 
                                                      src="/image/weeklyHits/celendion.png" 
                                                      alt="celendion" 
                                                      width={200} 
                                                      height={138} 
                                                      style={{ borderRadius: "12px",}}/>
                                                <h4 className={styles.name}>all by my self</h4>
                                                <span className={styles.musicName}>selen dion</span>
                                          </div>
                                          <div className={styles.weeklyHit}>
                                                <Image 
                                                      src="/image/weeklyHits/celendion.png" 
                                                      alt="celendion" 
                                                      width={310} 
                                                      height={138} 
                                                      style={{ borderRadius: "12px",}}/>
                                                <h4 className={styles.name}>all by my self</h4>
                                                <span className={styles.musicName}>selen dion</span>
                                          </div>
                                          <div className={styles.weeklyHit}>
                                                <Image 
                                                      src="/image/weeklyHits/celendion.png" 
                                                      alt="celendion" 
                                                      width={310} 
                                                      height={138} 
                                                      style={{ borderRadius: "12px",}}/>
                                                <h4 className={styles.name}>all by my self</h4>
                                                <span className={styles.musicName}>selen dion</span>
                                          </div>
                                          <div className={styles.weeklyHit}>
                                                <Image 
                                                      src="/image/weeklyHits/celendion.png" 
                                                      alt="celendion" 
                                                      width={200} 
                                                      height={138} 
                                                      style={{ borderRadius: "12px",}}/>
                                                <h4 className={styles.name}>all by my self</h4>
                                                <span className={styles.musicName}>selen dion</span>
                                          </div>
                                          <div className={styles.weeklyHit}>
                                                <Image 
                                                      src="/image/weeklyHits/celendion.png" 
                                                      alt="celendion" 
                                                      width={200} 
                                                      height={138} 
                                                      style={{ borderRadius: "12px",}}/>
                                                <h4 className={styles.name}>all by my self</h4>
                                                <span className={styles.musicName}>selen dion</span>
                                          </div>
                                          <div className={styles.weeklyHit}>
                                                <Image 
                                                      src="/image/weeklyHits/celendion.png" 
                                                      alt="celendion" 
                                                      width={310} 
                                                      height={138} 
                                                      style={{ borderRadius: "12px",}}/>
                                                <h4 className={styles.name}>all by my self</h4>
                                                <span className={styles.musicName}>selen dion</span>
                                          </div>
                              </div>
                        </div>
                  </div>
            </div>

      </main>
    );
  }
  