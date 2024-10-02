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

    let taxRate = 0.00;

    if (fields.income >= 578126) {
        taxRate = 0.37;
    } else if (fields.income >= 231251) {
        taxRate = 0.35;
    } else if (fields.income >= 182101) {
        taxRate = 0.32;
    } else if (fields.income >= 95376) {
        taxRate = 0.24;
    } else if (fields.income >= 44726) {
        taxRate = 0.22;
    } else if (fields.income >= 11001) {
        taxRate = 0.12;
    } else {
        taxRate = 0.10;
    }

    console.log(taxRate);

    const takeHomeIncomePerMonth = (fields.income * (1 - taxRate)) / 12;

    console.log(takeHomeIncomePerMonth);

    const billsByPercent = 100 * fields.bills / takeHomeIncomePerMonth;
    const foodByPercent = 100 * fields.food / takeHomeIncomePerMonth;
    const entertainmentByPercent = 100 * fields.entertainment / takeHomeIncomePerMonth;
    const transportationByPercent = 100 * fields.transportation / takeHomeIncomePerMonth;
    const otherByPercent = 100 * fields.other / takeHomeIncomePerMonth;

    const savingsByPercent = 100 - billsByPercent - foodByPercent - entertainmentByPercent - transportationByPercent - otherByPercent;
    if (savingsByPercent >= 0) {
        const percents = {
            billsByPercent: billsByPercent,
            foodByPercent: foodByPercent,
            entertainmentByPercent: entertainmentByPercent,
            transportationByPercent: transportationByPercent,
            otherByPercent: otherByPercent,
            savingsByPercent: savingsByPercent,
        }

        localStorage.setItem('pieChart', JSON.stringify(percents));

        loadPieChart();
    }
}

function loadPieChart() {
    const percentsFromLocal = JSON.parse(localStorage.getItem('pieChart'));
    // now fieldsFromLocal is actually the object

    if (!percentsFromLocal) {
        // if there is no local storage...
        document.querySelector('#noLocalStorageText').setAttribute('style', 'display: inline');
        document.querySelector('#highchart').setAttribute('style', 'display: none');
        // WELCOME MODAL????
    } else {
        // there is local storage, start using it.
        console.log("showing pie");
        document.querySelector('#noLocalStorageText').setAttribute('style', 'display: none');
        document.querySelector('#highchart').setAttribute('style', 'display: block');


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
                            y: percentsFromLocal.billsByPercent
                        },
                        {
                            name: 'Entertainment',
                            // sliced: true,
                            // selected: true,
                            y: percentsFromLocal.entertainmentByPercent
                        },
                        {
                            name: 'Transportation',
                            y: percentsFromLocal.transportationByPercent
                        },
                        {
                            name: 'Food',
                            y: percentsFromLocal.foodByPercent
                        },
                        {
                            name: 'Other',
                            y: percentsFromLocal.otherByPercent
                        },
                        {
                            name: 'Savings',
                            y: percentsFromLocal.savingsByPercent
                        }
                    ]
                }
            ]
        });

    }
}


form.addEventListener('submit', handleSubmit);


loadPieChart();





