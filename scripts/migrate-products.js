// Load environment variables from .env file
require('dotenv').config();

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Product data from the original products-data.js
const PRODUCTS_DATA = [
  {"code":"TG1025003","name":"LAMPADA 1 POLO 24V 21W BA15S","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"SLL-10003","name":"KIT SUPER LED H7 6000K 12V 3200 LUMENS 35W","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"TERMINAL DA BATERIA SAPINHO","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"TG1025005","name":"LÂMPADAS 2 POLOS 24V 21/5W BAY15D","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"SLL-10004","name":"KIT SUPER LED H4 6000K 12V 3200 LUMENS 32W","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"FITA ISOLANTE 5M","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"FITA ISOLANTE 20M","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"TOMADA MACHO 7 POLOS - WITTEC","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"RADIO MP3 4X50W/12V BLUET/USB","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"FITA ISOLANTE 10M","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"ABRAÇADEIRA PLASTICA 15CMX2,5X1,0MM","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"ABRAÇADEIRA PLASTICA 28CMX4,8X1,0MM","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"CHICOTE 7 FIOS COM TOMADA MACHO 5,5M WITTEC","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"ABRAÇADEIRA PLASTICA 20CMX3,6X1,4MM","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"TOMADA FEMEA 7 POLOS - WITTEC","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"SL121141","name":"LAMPADA 1 POLO 12V P21W SHOCKLIGHT","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"TG1015H7","name":"LAMPADA H7 12V 55W TIGER","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"DESENGRIPANTE SPRAY 300ML - ETANIZ","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"SL12T10","name":"LAMPADA PINGAO 12V T10 W5W SHOCKLIGHT","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"TG1025004","name":"LAMPADA 2 POLOS 12V 21/5W TIGER","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"F0202","name":"MOTOR PARTIDA VW GOL/FOX/POLO 11 DENTES C/ REDUÇAO","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"DESCARBONIZANTE LIMPA TBI/BICO MP80 - MUNDIAL","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"DNI0102","name":"RELE AUX 40A 4T","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"LAMPADA H4 12V 60/55W - DAYLUX","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H1010","name":"FUSIVEL LAMINA 10 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H1020","name":"FUSIVEL LAMINA 20 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"FITA TECIDO 20M - ISOFLEX","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H1005","name":"FUSIVEL LAMINA 05 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H1015","name":"FUSIVEL LAMINA 15 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H1025","name":"FUSIVEL LAMINA 25 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H1030","name":"FUSIVEL LAMINA 30 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H2010","name":"FUSIVEL LAMINA MINI 10 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H2020","name":"FUSIVEL LAMINA MINI 20 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H2030","name":"FUSIVEL LAMINA MINI 30 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H2005","name":"FUSIVEL LAMINA MINI 05 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H2015","name":"FUSIVEL LAMINA MINI 15 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"H2025","name":"FUSIVEL LAMINA MINI 25 HIKARI","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"ROLAMENTO ACD CVC NSK 35X50X20","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"IM00182S","name":"TERMINAL FEMEA C/ TRAVA 1,5MM","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"ETE7760","name":"CHICOTE INJEÇAO, LANTERNA 5V","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"TC102.1005","name":"CHICOTE UNIVERSAL INJEÇÃO, BOMBA 2V","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"TC102.1053","name":"SOQUETE FAROL LAMPADA H7 FIO 1,5MM","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"ETE7090B","name":"SOQUETE FAROL LAMPADA H4 FIO 1,5MM","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"ETE7595","name":"SOQUETE BASE RELE 5V","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"TC102.1018","name":"CHICOTE UNIVERSAL, BOBINA, BOMBA, FAROL 2V","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"TC202.2005","name":"CHICOTE 2V BULDOG","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"TC202.2018","name":"CHICOTE 2V SUPERSEAL","nomeFornecedor":"","description":"","imageUrl":"","url":""},
  {"code":"","name":"KIT CONECTORES MACHO/FEMEA/CAPA 2.8/4.8/6.3mm","nomeFornecedor":"","description":"","imageUrl":"","url":""}
];

async function migrateProducts() {
  try {
    console.log('🚀 Iniciando migração dos produtos...');
    
    // Debug: Check if environment variables are loaded
    console.log('🔍 Verificando configuração Firebase...');
    console.log('API Key:', process.env.REACT_APP_FIREBASE_API_KEY ? '✅ Carregada' : '❌ Não encontrada');
    console.log('Project ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID ? '✅ Carregado' : '❌ Não encontrado');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    
    // Create admin user
    console.log('👤 Criando usuário administrador...');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        'admin@revtech.com.br', 
        'admin123456'
      );
      console.log('✅ Usuário administrador criado:', userCredential.user.email);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('ℹ️ Usuário administrador já existe');
      } else {
        throw error;
      }
    }
    
    // Import products
    console.log('📦 Importando produtos...');
    const productsRef = collection(db, 'products');
    
    let importedCount = 0;
    for (const product of PRODUCTS_DATA) {
      try {
        await addDoc(productsRef, {
          ...product,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        importedCount++;
        console.log(`✅ Produto importado: ${product.name}`);
      } catch (error) {
        console.error(`❌ Erro ao importar produto ${product.name}:`, error);
      }
    }
    
    console.log(`🎉 Migração concluída! ${importedCount} produtos importados.`);
    console.log('📧 Credenciais do administrador:');
    console.log('   Email: admin@revtech.com.br');
    console.log('   Senha: admin123456');
    console.log('⚠️  IMPORTANTE: Altere a senha após o primeiro login!');
    
  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    process.exit(1);
  }
}

// Run migration
migrateProducts();
