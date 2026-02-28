export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center text-cream">
      <div className="text-center">
        <h1 className="font-serif text-6xl mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <a href="/" className="text-gold underline underline-offset-4">
          Return home
        </a>
      </div>
    </div>
  )
}
