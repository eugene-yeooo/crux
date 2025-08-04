export default function AdventureFilterNav({
  selected,
  onChange,
}: {
  selected: string
  onChange: (filter: string) => void
}) {
  const filters = ['all', 'climb', 'canyon', 'cave', 'alpine', 'dive']

  return (
    <div className="flex gap-0 flex-wrap justify-center my-4 bg-white shadow-lg rounded-lg">
      {filters.map((type) => {
        const label =
          type === 'all'
            ? 'All'
            : type.charAt(0).toUpperCase() + type.slice(1) + 's'

        const isActive = selected === type

        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            disabled={isActive}
            className={`px-16 py-2 my-3 mx-3 text-sm font-semibold rounded transition 
              ${
                isActive
                  ? 'bg-brandPrimary text-brandBlack cursor-default'
                  : 'bg-white text-brandBlack shadow-sm hover:bg-brandBlack hover:text-brandPrimary transition-transform hover:scale-105'              
              }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
