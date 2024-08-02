export default function exportData(data: string[][], headers: string[]): void{
    console.log("input:",data,headers);

    const output = data.map(row => {
        return row.reduce((acc,value,i) => ({...acc, [headers[i]]:value }) , {})
    })

    console.log("output:",output)

}