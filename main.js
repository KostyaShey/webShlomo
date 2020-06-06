const content = {
    expences: [
        { name: 'Sex', value: 69 },
        { name: 'Drugs', value: 666 },
        { name: "Rock'n'Roll", value: 11 },
        { name: 'Yo Moma', value: 69 }],
    income: [
        { name: 'Hustle', value: 100 },
        { name: 'Hustle', value: 100 },
        { name: 'Hustle', value: 100 },
        { name: 'Hustle', value: 100 },
    ]
}

const siteContent = document.getElementById('contentScript');
const siteContentScource = siteContent.innerHTML;
const template = Handlebars.compile(siteContentScource);
const compiledHtml = template(content);

document.getElementById('content').innerHTML = compiledHtml;