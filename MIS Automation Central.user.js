// ==UserScript==
// @name         MIS Automation Central
// @namespace    http://tampermonkey.net/
// @version      2026-09-18
// @description  All in one script for MIS automation
// @author       Bharath
// @match        https://mis.iitism.ac.in/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://raw.githubusercontent.com/bharath6115/TamperMonkey-Scripts/refs/heads/main/utils.js
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      api.ocr.space
// ==/UserScript==

window.addEventListener("load", async function() {
    'use strict';

    let toLocation = GM_getValue("to");
    let retryCount = parseInt(sessionStorage.getItem("retryCount") || "0");
    let currentPart = window.location.href.substr("https://mis.iitism.ac.in/".length);

    const handleLogin = async () => {

        if(retryCount >= 5){
            alert("Retry limit exceeded.. enter manually or open in new tab again");
            return;
        }
        console.log(retryCount);

        const images = document.querySelectorAll("img:not(.big-logo):not(.icon)");
        if(images.length != 1){
            alert("RE-ADJUST THE SELECTION OF CAPTCHA IMAGE (document.querySelector)");
            return;
        }

        async function solveCaptcha(src) {
            
            try {
                const formData = new URLSearchParams();
                formData.append('base64Image', src);
                formData.append('scale', "true");
                formData.append('language', "eng");
                formData.append('OCREngine', "2");
                //register for a free api key in https://api.ocr.space for this
                formData.append('apikey', 'your_api_key');

                const data = await dataFetch.request({
                    method: 'POST',
                    url: 'https://api.ocr.space/parse/image',
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    data: formData.toString(),
                })

                if (!data.ParsedResults || data.ParsedResults[0].ParsedText.length === 0){
                    console.log("Unable to parse the captcha");
                    return;
                }

                const captcha = data.ParsedResults[0].ParsedText
                .replace(/\s/g, '')
                .replace(/[^a-zA-Z0-9]/g, '')
                .toLowerCase();

                return captcha;

            } catch (e) {
                alert("OCR parse error:", e);
                return;
            }

        }


        const src = images[0].src;
        if(!src){
            alert("captcha image src is somehow broken bro 💔🥀");
            return;
        }

        const form = document.querySelector("form#login");
        // run the below command only once by uncommenting, then it gets saved for this script.
        //  await GM_setValue("password", "PasswordValue"); 
        const password = await GM_getValue("password");

        if(!password){
            alert("Password somehow unset. please reset the password using GM_setValue in script");
            return;
        }

        //set this value to your admission number
        form[0].value = "Your_Admission_Number";
        form[1].value = password;

        const captcha = await solveCaptcha(src);
        if(!captcha) return;
        console.log("captcha: "+ captcha);
        form[3].value = captcha;

        const submitButton = document.querySelector("button");
        sessionStorage.setItem("retryCount", retryCount + 1);
        submitButton.click()
    }


    const handleRedirect = () => {
        sessionStorage.removeItem("retryCount");
        window.location.href = "https://mis.iitism.ac.in/index.php/faculty_tutorials/student_choose_syear_sess";
    }


    const handleNotesSelection = () => {
        if(window.location.href == "https://mis.iitism.ac.in/index.php/faculty_tutorials/student_choose_syear_sess"){
            const form = document.querySelectorAll("form")[1];
            //update these
            form[0].value = "2026-2027";
            form[1].value = "Monsoon";
            form[2].click();

        }else{
            setTimeout(()=>{
                const select = document.querySelectorAll(".table-responsive .form-control")[0];
                select.value = 100
                select.dispatchEvent(new Event('change', { bubbles: true }));
                document.querySelectorAll(".table-responsive th.sorting")[7].click()
            },1000)
        }
    }


    if(currentPart == "") handleLogin();
    else if (currentPart == "index.php/home") handleRedirect();
    else if (currentPart.indexOf("index.php/faculty_tutorials/student_choose_syear_sess") != -1) handleNotesSelection();

});
