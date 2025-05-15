import { useEffect, useState } from "react";

interface Competition {
  id: {$oid: string};
  name  : string;
  shortDescription: string;
  logoImage: string;
}

export default function TodoAPI() {
  const [datas, setData] = useState<Competition[]>([]);

  useEffect(() => {
  fetch('https://api.emhoctoan.com/api/competitions?condition=%7B%7D&isMany=false')
    .then(res => res.json())
    .then(data => {
      console.log('Kết quả từ API:', data);
      setData(data.data.competition); // ← Đúng mảng cần set
    })
    .catch(err => console.error('Lỗi khi fetch API:', err));
}, []);


  return (
    <div>
      {datas.length === 0 ? (
        <p>Không có dữ liệu hoặc đang tải...</p>
      ) : (
        datas.map(item => (
          <div key={item.id.$oid} style={{ border: "1px solid #ccc", marginBottom: "20px", padding: "10px", background: "white"}}>
            <h3>{item.name}</h3>
            <p>{item.shortDescription}</p>
            <img src={item.logoImage} alt={item.name} style={{ width: "200px", height: "auto" }} />
          </div>
        ))
      )}
    </div>
  );
}
