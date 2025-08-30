import { useState } from "react"
import {ImtihonPage, JurnalPage, OqtuvchiPage, Uy_vazefalarPage, VideolarPage, YoqlamaPage } from "../../components"

const Grops = () => {
  const [activeTab, setActiveTab] = useState("yoqlama")

  return (
    <div className="p-4 bg-[#d1d1d1FF]">
      <div className="p-6 bg-[#FFFFFF] rounded-md">
        <h2 className="text-[22px] font-semibold">Frontend ReactJS(Standard)N94</h2>

        <div className="flex items-center gap-[25px] pt-[20px] text-[18px] font-semibold">
          <button onClick={() => setActiveTab("yoqlama")} className={activeTab === "yoqlama" ? "text-[#bc8e5b] border-b-[3px] border-[#bc8e5b] cursor-pointer" : "cursor-pointer"}>Yo'qlama</button>
          <button onClick={() => setActiveTab("videolar")} className={activeTab === "videolar" ? "text-[#bc8e5b] border-b-[3px] border-[#bc8e5b] cursor-pointer" : "cursor-pointer"}>Videolar</button>
          <button onClick={() => setActiveTab("uy-vazifalari")} className={activeTab === "uy-vazifalari" ? "text-[#bc8e5b] border-b-[3px] border-[#bc8e5b] cursor-pointer" : "cursor-pointer"}>Uy vazifalari</button>
          <button onClick={() => setActiveTab("imtihonlar")} className={activeTab === "imtihonlar" ? "text-[#bc8e5b] border-b-[3px] border-[#bc8e5b] cursor-pointer" : "cursor-pointer"}>Imtihonlar</button>
          <button onClick={() => setActiveTab("jurnal")} className={activeTab === "jurnal" ? "text-[#bc8e5b] border-b-[3px] border-[#bc8e5b] cursor-pointer" : "cursor-pointer"}>Jurnal</button>
          <button onClick={() => setActiveTab("oqtuvchi-davomati")} className={activeTab === "oqtuvchi-davomati" ? "text-[#bc8e5b] border-b-[3px] border-[#bc8e5b] cursor-pointer" : "cursor-pointer"}>O'qtuvchi davomati</button>
        </div>

        <div className="mt-6">
          {activeTab === "yoqlama" && <div><YoqlamaPage/></div>}
          {activeTab === "videolar" && <div><VideolarPage/></div>}
          {activeTab === "uy-vazifalari" && <div><Uy_vazefalarPage/></div>}
          {activeTab === "imtihonlar" && <div><ImtihonPage/></div>}
          {activeTab === "jurnal" && <div><JurnalPage/></div>}
          {activeTab === "oqtuvchi-davomati" && <div><OqtuvchiPage/></div>}
        </div>
      </div>
    </div>
  )
}

export default Grops
