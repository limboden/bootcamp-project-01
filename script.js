// const yourBills = localStorage.getItem("Bills");
// const yourEntertainment = localStorage.getItem("Entertainment");
// const yourTransportation = localStorage.getItem("Transportation");
// const yourFood = localStorage.getItem("Food");
// const yourOther = localStorage.getItem("Other");
// const yourIncome = localStorage.getItem("Income");


const form = document.querySelector('form');

function handleSubmit(event) {
    event.preventDefault();
    const incomeField = document.querySelector('#Income');
    const billsField = document.querySelector('#Bills');
    const foodField = document.querySelector('#Food');
    const entertainmentField = document.querySelector('#Entertainment');
    const transportationField = document.querySelector('#Transportation');
    const otherField = document.querySelector('#Other');

    const fields = {
        income: incomeField.value,
        bills: billsField.value,
        entertainment: entertainmentField.value,
        transportation: transportationField.value,
        food: foodField.value,
        other: otherField.value
    }

    localStorage.setItem('fields', JSON.stringify(fields));

    console.log(localStorage.getItem('fields'));

    loadPieChart();


}

function loadPieChart() {
    const fieldsFromLocal = JSON.parse(localStorage.getItem('fields'));
    // now fieldsFromLocal is actually the object

    if (!fieldsFromLocal) {
        // if there is no local storage...
        document.querySelector('#noLocalStorageText').setAttribute('style', 'display: inline');
        document.querySelector('#highchart').setAttribute('style', 'display: none');
        // WELCOME MODAL????
    } else {
        // there is local storage, start using it.
        console.log("showing pie");
        document.querySelector('#noLocalStorageText').setAttribute('style', 'display: none');
        document.querySelector('#highchart').setAttribute('style', 'display: block');

        let taxRate = 0.00;

        if (fieldsFromLocal.income >= 578126) {
            taxRate = 0.37;
        } else if (fieldsFromLocal.income >= 231251) {
            taxRate = 0.35;
        } else if (fieldsFromLocal.income >= 182101) {
            taxRate = 0.32;
        } else if (fieldsFromLocal.income >= 95376) {
            taxRate = 0.24;
        } else if (fieldsFromLocal.income >= 44726) {
            taxRate = 0.22;
        } else if (fieldsFromLocal.income >= 11001) {
            taxRate = 0.12;
        } else {
            taxRate = 0.10;
        }

        console.log(taxRate);

        const takeHomeIncomePerMonth = (fieldsFromLocal.income * (1 - taxRate)) / 12;

        console.log(takeHomeIncomePerMonth);

        const billsByPercent = 100 * fieldsFromLocal.bills / takeHomeIncomePerMonth;
        const foodByPercent = 100 * fieldsFromLocal.food / takeHomeIncomePerMonth;
        const entertainmentByPercent = 100 * fieldsFromLocal.entertainment / takeHomeIncomePerMonth;
        const transportationByPercent = 100 * fieldsFromLocal.transportation / takeHomeIncomePerMonth;
        const otherByPercent = 100 * fieldsFromLocal.other / takeHomeIncomePerMonth;

        const savingsByPercent = 100 - billsByPercent - foodByPercent - entertainmentByPercent - transportationByPercent - otherByPercent;

        if (savingsByPercent > 0) {
            Highcharts.chart('highchart', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Your Budget'
                },
                tooltip: {
                    valueSuffix: '%'
                },
                // subtitle: {
                //     text:
                //         'Source: you'
                // },
                plotOptions: {
                    series: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: [{
                            enabled: true,
                            distance: 20
                        }, {
                            enabled: true,
                            distance: -40,
                            format: '{point.percentage:.1f}%',
                            style: {
                                fontSize: '1.2em',
                                textOutline: 'none',
                                opacity: 0.7
                            },
                            filter: {
                                operator: '>',
                                property: 'percentage',
                                value: 10
                            }
                        }]
                    }
                },
                series: [
                    {
                        name: 'Percentage',
                        colorByPoint: true,
                        data: [
                            {
                                name: 'Bills',
                                y: billsByPercent
                            },
                            {
                                name: 'Entertainment',
                                // sliced: true,
                                // selected: true,
                                y: entertainmentByPercent
                            },
                            {
                                name: 'Transportation',
                                y: transportationByPercent
                            },
                            {
                                name: 'Food',
                                y: foodByPercent
                            },
                            {
                                name: 'Other',
                                y: otherByPercent
                            },
                            {
                                name: 'Savings',
                                y: savingsByPercent
                            }
                        ]
                    }
                ]
            });
        } else {

        }







    }
}





form.addEventListener('submit', handleSubmit);




loadPieChart();





