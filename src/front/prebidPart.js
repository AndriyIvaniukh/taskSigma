const HEADERS_ARRAY = { bidder: 'Bidder Name', cpm: 'CPM', currency: 'Currency', size: 'Size' };

createMainButton('SHOW POPUP');

function createMainButton(buttonText) {
    let myDiv = document.createElement('div');
    myDiv.className = 'mainButtonDiv';
    myDiv.id = 'myDiv';

    let myBtn = document.createElement('button');
    myBtn.className = 'adsBtn';
    myBtn.id = 'myBtn';
    myBtn.innerText = buttonText;
    myBtn.addEventListener('click', () => getAdsInfo());

    myDiv.appendChild(myBtn);
    document.body.appendChild(myDiv);
}

function getAdsInfo() {
    try {
        console.log('click')
        if (pbjs === undefined) {
            throw new Error('Prebid module not found');
        }
        let adsInfoArray = getObj();
        // Array for testing when pbjs not working
        // adsInfoArray = [
        //     { bidder: 'adasdadsda', cpm: 'cpm', currency: 'enough', size: 'large' },
        //     { bidder: 'adasdadsda', cpm: 'cpm', currency: 'enough', size: 'large' },
        //     { bidder: 'adasdadsda', cpm: 'cpm', currency: 'enough', size: 'large' },
        //     { bidder: 'adasdadsda', cpm: 'cpm', currency: 'enough', size: 'large' },
        //     { bidder: 'adasdadsda', cpm: 'cpm', currency: 'enough', size: 'large' },
        //     { bidder: 'adasdadsda', cpm: 'cpm', currency: 'enough', size: 'large' },
        //     { bidder: 'adasdadsda', cpm: 'cpm', currency: 'enough', size: 'large' },
        //     { bidder: 'adasdadsda', cpm: 'cpm', currency: 'enough', size: 'large' },
        // ]
        if (adsInfoArray.length === 0) {
            window.alert('No information about ad`s');
        } else {
            createIframe(adsInfoArray);
        }
    } catch (e) {
        window.alert('Prebid module not found')
        console.log(e);
    }
}


function getObj() {
    let allPrebid = pbjs.getAllPrebidWinningBids();
    let adsInfoArray = [];

    allPrebid.map(el => {
        googletag.pubads().getSlots().map(value => {
                if (el.adUnitCode === value.getSlotId().getDomId()) {
                    adsInfoArray.push({
                        bidder: el.bidder,
                        cpm: el.cpm,
                        currency: el.currency,
                        size: el.size,
                        unitCode: el.adUnitCode,
                        unitPath: value.getAdUnitPath()
                    })
                }
            }
        )

    });

    return adsInfoArray;
}

function createIframe(elementsArray) {
    if (document.getElementById('myIframe')) {
        let myIframe = document.getElementById('myIframe');
        myIframe.remove();
    }

    let div = document.createElement('div');
    div.className = 'myIframeDiv';
    div.id = 'myIframe';

    let iframe = document.createElement('iframe');
    iframe.className = 'myIframe';
    div.appendChild(iframe);
    document.body.appendChild(div);

    let divElement = document.createElement('div');
    divElement.className = 'myIframeBody';

    //I don't know why, but css file don't set styles for this and next fields
    divElement.style.display = 'flex';
    divElement.style.flexDirection = 'column';
    divElement.style.justifyContent = 'space-between';
    divElement.style.alignItems = 'center';
    divElement.style.width = '100%';
    divElement.style.height = '100%';

    divElement.appendChild(createTable(elementsArray, HEADERS_ARRAY))

    let buttonDiv = document.createElement('div');
    let closeButton = document.createElement('button');
    closeButton.innerText = 'CLOSE';
    closeButton.addEventListener('click', () => {
        let myIframe = document.getElementById('myIframe');
        myIframe.remove();
    });
    buttonDiv.appendChild(closeButton);
    divElement.appendChild(buttonDiv);
    iframe.contentWindow.document.body.appendChild(divElement);

}

function createTable(elementsArray, headersArray) {
    let filteredArray = elementsArray.map(el => {
        let obj = {};
        for (const elKey in el) {
            for (const hedArrKey in headersArray) {
                if (elKey === hedArrKey) {
                    obj = { ...obj, [elKey]: el[elKey] };
                    break;
                }
            }
        }
        return obj;
    });
    let myDiv = document.createElement('div');
    myDiv.className = 'myTableWrapper';
    myDiv.style.width = '100%';

    let table = document.createElement('table');
    table.className = 'myTable';
    table.style.border = '2px solid black';
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.height = 'auto';

    let hedTr = document.createElement('tr');
    for (const headerKey in filteredArray[0]) {
        let hedTh = document.createElement('th');
        hedTh.className = 'myHedTh';
        hedTh.style.borderLeft = '2px solid black';
        hedTh.style.borderBottom = '2px solid black';
        hedTh.innerHTML = headerKey;
        hedTr.appendChild(hedTh);
    }

    table.appendChild(hedTr);

    filteredArray.map(el => {
        let bodTr = document.createElement('tr');
        for (const value in el) {
            let bodTd = document.createElement('td');
            bodTd.className = 'myHodTd';
            bodTd.style.borderRight = '2px solid black';
            bodTd.innerHTML = el[value];
            bodTr.appendChild(bodTd);
        }
        table.appendChild(bodTr);
    })

    myDiv.appendChild(table);
    return myDiv;
}

