const expences = [
    { name: 'Sex', value: 69 },
    { name: 'Drugs', value: 666 },
    { name: "Rock'n'Roll", value: 11 },
    { name: 'Yo Moma', value: 69 }
];

const income = [
    { name: 'Hustle', value: 100 },
    { name: 'Hustle', value: 100 },
    { name: 'Hustle', value: 100 },
    { name: 'Hustle', value: 100 },
];

const content = {
    data: [{ nameType: 'Expences', tableData: expences, idType: 'expencesSum' },
        { nameType: 'Income', tableData: income, idType: 'incomeSum' }
    ],

    sum: function (array) {
        let valueSum = array.reduce((currentSum, array) => currentSum + array.value, 0);
        return valueSum;
    },
}

const siteContent = document.getElementById('contentScript');
const siteContentScource = siteContent.innerHTML;
const template = Handlebars.compile(siteContentScource);
const compiledHtml = template(content);

document.getElementById('content').innerHTML = compiledHtml;

console.log(content.data.tableData);

document.getElementById('expencesSum').innerHTML = content.sum(content.data[0].tableData).toString() + ' &euro;';
document.getElementById('incomeSum').innerHTML = content.sum(content.data[1].tableData).toString() + ' &euro;';
