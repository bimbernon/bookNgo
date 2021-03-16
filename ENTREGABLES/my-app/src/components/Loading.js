import spinner from "./puff.svg";
export default function Loading() {
  return (
    <div className="loading">
      <img src={spinner} alt="Cargando..." width="200" />
    </div>
  );
}
