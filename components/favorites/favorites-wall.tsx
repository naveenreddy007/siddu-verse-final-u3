interface FavoriteItem {
  id: string
  title: string
  imageUrl: string
}

interface FavoritesWallProps {
  items: FavoriteItem[]
}

export function FavoritesWall({ items }: FavoritesWallProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="favorites-wall">
      {items.map((item) => (
        <div key={item.id} className="favorite-item">
          <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  )
}
