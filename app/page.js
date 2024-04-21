import Link from "next/link"

export default function Home() {
  const name = 'Andrew Ji';
  return (
    <div>
      <h4 className="title">예약시스템</h4>
      <p className="title-sub">by {name}</p>
    </div>
  );
}
