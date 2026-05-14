import type { Category } from './trianers'

type Props = {
  categories: readonly Category[]
  active: Category
  onChange: (cat: Category) => void
}

const CategoryFilter = ({ categories, active, onChange }: Props) => {
  return (
    <div className="mb-10 flex w-full flex-wrap items-center gap-2 bg-white p-3 xl:justify-between">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full border border-[#EBEBEB] px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
            active === cat
              ? 'bg-primary text-white'
              : 'text-muted hover:text-muted-foreground'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
