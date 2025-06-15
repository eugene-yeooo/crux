export default function LogPage({ log }) {

  

  const labelStyle = 'font-semibold'

return (
    <div className="rounded-lg shadow p-4 bg-white space-y-2">
      <h3 className="text-xl font-bold">{log.objectiveName}</h3>
      {log.title && <p className="text-md text-gray-800 italic">{log.title}</p>}
      <p>{log.location}</p>
      <p className="text-sm">{log.date}</p>
      
       
      

    </div>
)
}