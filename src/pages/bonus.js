import React from "react";

import '../styles/panel_styles.css';
import '../styles/tut_styles.css'

import PAE from "../tutorials/paape.mdx";


import { NavComp } from "../components/mainNav";

const BonusPage = () => {



    return (
        <main>

            <div className="everything-container">
                <NavComp />

                <div style={{ padding: 15, marginTop: 70 }}>
                    Welcome to the bonus zone! This is all the stuff that doesn't really fit on this website but I put it in here anyway.
                    


                    <div className="tut-selector">
                        <PAE/>
                    </div>
                </div>

            </div>

        </main>
    )
}


export default BonusPage;