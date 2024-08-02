export default async function importData(){
    const input = (await require('./data.json')) as any[];

    const headers = Object.keys(input[0]);

    const data = input.map(row => {
        return headers.reduce((res,key) => [...res,row[key].toString()], [])
    } );


    const res = {
        headers,
        data,
    };

    console.log("parsed input",res);

    return res;
}