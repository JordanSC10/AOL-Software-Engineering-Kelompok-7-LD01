import React from 'react';

export default function About() {
  const team = [
    "Gregorius Gilbert", "Jordan Stevano", "Raymond Timothy", 
    "Nabil Ghifari", "Willian Alvin"
  ];

  return (
    <div style={{ 
      padding: "60px 20px", 
      maxWidth: "900px", 
      margin: "0 auto", 
      color: "white", 
      textAlign: 'center' 
    }}>
      <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px' }}>
        The Story of GearShare
      </h1>
      
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(10px)', 
        padding: '40px', 
        borderRadius: '25px', 
        lineHeight: '1.8',
        fontSize: '18px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        textAlign: 'justify'
      }}>
        <p>
          GearShare lahir dari keresahan sederhana lima orang sekawan yang hobi berolahraga. Kami seringkali ingin mencoba berbagai cabang olahraga baru, namun selalu terbentur masalah yang sama: <strong>"Alatnya nggak punya, dan kalau beli, harganya lumayan mahal."</strong>
        </p>
        <p style={{ marginTop: '20px' }}>
          Berangkat dari masalah tersebut, kami berpikir—mengapa tidak ada platform yang memudahkan orang untuk saling meminjamkan alat olahraga? Dengan GearShare, kami ingin memastikan bahwa biaya peralatan tidak lagi menjadi penghalang bagi siapa pun untuk hidup sehat dan aktif.
        </p>
      </div>

      <h2 style={{ marginTop: '50px', marginBottom: '30px', fontSize: '28px' }}>The Founders</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '20px' 
      }}>
        {team.map((name, index) => (
          <div key={index} style={{ 
            padding: '20px', 
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>👤</div>
            <p style={{ fontWeight: 'bold', margin: 0 }}>{name}</p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '50px', fontStyle: 'italic', opacity: 0.8 }}>
        "Making sports accessible for everyone, one gear at a time."
      </p>
    </div>
  );
}