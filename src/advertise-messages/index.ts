import path from 'path';
import { LocalPath, MessageLike } from 'telegram/define';
import { TMakeCounter, makeCounter } from '../utils/helpers';

export type TAdvertiseMessage = {
  messagesIndexController: TMakeCounter,
  messages: {
    message: MessageLike,
    file?: LocalPath
  }[]
}


// Free channel ad messages
export const communityOfTradersFreeAdvertiseMessages: TAdvertiseMessage = {
	messagesIndexController: makeCounter(),
	messages: [
		{
			message: '🤑📌 TOP SINAIS CATALOGADOS LOGO MAIS.... VAI PERDER⁉️ 🗒️👇👇👇\n' +'\n' +
      '👉 Na sala vip tem😃🤑\n' + '\n' +
      '🆘 Se precisar de ajuda é só chamar: https://wa.me/message/RMWFMXEKWKD3B1'
		},
		{
			message: '📊 NÃO ESQUECA❗De 2ª a 6ª Feira, entre 19h e 22h... Sinais catalogados, dicas, setups, cursos, orientações e materiais GRATUITOS de trade.😃👍\n' +'\n' +
      '👉 Na sala vip tem😃🤑\n' +      '\n' +
      '🆘 Se precisar de ajuda é só chamar: https://wa.me/message/RMWFMXEKWKD3B1',
		},
		{
			message: '🤑🤑🤑🤑🤑🤑👇\n' + '\n' +
      'Para ganhar dinheiro com a gente, abra conta em uma ou mais das Corretoras relacionadas abaixo e envie o ID para: https://wa.me/message/RMWFMXEKWKD3B1\n' + '\n' +'\n' +
      'CORRETORAS 👇👇👇\n' + '\n' +
      'QUOTEX: (https://broker-qx.pro/sign-up/fast/?lid=460583)  \n' + '\n' +
      'DERIV: https://track.deriv.com/_cyO26K1ZNg3Jh72hnsu9RmNd7ZgqdRLk/1/\n' +'\n' +
      'IQ OPTION: https://affiliate.iqbroker.com/redir/?aff=378040&aff_model=revenue&afftrack=',
		},
		{
			message: '🚦🗒️ COMO APROVEITAR MELHOR NOSSOS SINAIS TOP❓\n' + '\n' + '\n' +
      '🤑👉 Abra conta GRÁTIS na QUOTEX: (https://broker-qx.pro/sign-up/fast/?lid=460583)  \n' + '\n' +
      '🤑👉Abra conta GRÁTIS na DERIV: https://track.deriv.com/_cyO26K1ZNg3Jh72hnsu9RmNd7ZgqdRLk/1/\n' + '\n' +
      '🤑👉Abra conta GRÁTIS na IQ OPTION: https://affiliate.iqbroker.com/redir/?aff=378040&aff_model=revenue&afftrack=\n' + '\n' +
      '🚨🔂 Se você decidir usar martingale, UTILIZE SOMENTE UM.\n' + '\n' +
      '📈📉 Entre nas operações somente a favor da tendência.\n' + '\n' +
      '❌⛔ Não entre em todas as operações!\n' + '\n' +
      '🎯👉 Só entre nas operações que aconteceram um GAP em seu favor. \n' + '\n' +
      '⏰👉 Fique atento ao Tempo de Expiração da operação, para qual Corretora é o sinal, se é OTC ou mercado normal.\n' + '\n' +
      '🔢👉 Siga um Gerenciamento inteligente e profissional.\n' + '\n' +
      '😡😞 Não opere se estiver com o seu psicológico abalado de alguma forma.\n' +'\n' +
      '💸🚫 Não opere colocando em risco dinheiro comprometido com contas e sua subsistência.'
		},
		{
			message: '💰VEM PRA NA NOSSA SALA VIP LUCRAR MUITO MAIS! 🤑\n' + '\n' +
      '🌟SIIIMMM! EU SEI! Você já está lucrando com nossos Sinais Free? Mas, que tal lucrar MUITO MAIS ?😱\n' + '\n' +
      '🤩Gostou né!?\n' + '\n' +
      '🚀 💵 Chama agora: https://bit.ly/QUERO-MINHA-PRÓPRIA-SALA-DE-SINAIS'
		},
		{
			message: '❓❔❓❔❓❔❓❔❓❔❓❔❓❔❓❔\n' + '\n' + '\n' +
      '🤷‍♂️ PERGUNTAS FREQUENTES E RESPOSTAS: 🤷‍♀️\n' + '\n' +'\n' +
      '1️⃣ Por que não manda no Canal o print das operações realizadas?\n' + '\n' +
      'RESPOSTA: Porque se a gente for fazer o print de cada operação para colocar no Canal, pode atrapalhar os Sinais que vão chegando. 📈🌎\n' + '\n' + '\n' +
      '2️⃣ As operações são enviadas por robôs?\n' + '\n' +
      'RESPOSTA: Não! Nós utilizamos uma automação apenas para formatar as mensagens do nosso jeito e  colocar no Canal. 🤖🌐\n' + '\n' +'\n' +
      '3️⃣ Os sinais são assertivos?\n' + '\n' +
      'RESPOSTA: Sim, com certeza! Se você seguir todas as dicas e orientações que damos, a assertividade varia de 88 a 97%. 🎯✅\n' + '\n' + '\n' +
      '4️⃣ É tudo grátis mesmo ou é só pegadinha?\n' +'\n' +
      'RESPOSTA: É tudo realmente grátis e sem pegadinha ou surpresas. Basta abrir uma conta com o nosso código, fazer um depósito inicial de R$ 100,00 na sua conta e movimentar pelo menos R$ 100,00 todo mês.💰🆓\n' +'\n' +'\n' +
      '5️⃣ Mas se eu não quiser abrir conta com o código de vocês e mesmo assim quiser participar do Canal? Tem como? \n ' + '\n' +
      'RESPOSTA: Tem sim. Neste caso, você pode optar por pagar uma pequena taxa mensal para participar.😃👍 \n' + '\n' + '\n' +
      '6️⃣ Vocês têm programa de Afiliados?\n' + '\n' +
      'RESPOSTA: Com certeza. Entre em contato com o nosso suporte para saber como ganhar dinheiro como afiliado 🤝🚀',
		},
		{
			message: '🚀 COMO VOCÊ GANHA DINHEIRO COM A GENTE?\n' + '\n' + '\n' +
      '✅ Abra conta com o nosso código 😃👍\n' + '\n' + '\n' +
      '✅ Aproveite de 50-120 sinais diários de M1, M5 com alta assertividade dos melhores Traders do mundo 🌐🎯\n' + '\n' + '\n' +
      '✅ Assista ao vídeo fixado para saber como pegar os sinais💰😃\n' + '\n' + '\n' +
      '✅ Aproveite nossas Listas de Sinais Catalogados e Lives periódicas 📹📈\n' + '\n' + '\n' +
      '✅ Suporte por telegram, orientação de Contador, Advogado, Psicólogo, Pdf\'s , materiais de gerenciamento, operacional e psicotrade 📚⚖️\n' + '\n' +'\n' +
      '✅ Bônus e descontos especiais 💰🎁',
			file: path.join( __dirname, '..', 'imgs', 'comunidade-traders', 'img-2.jpg'),
		},
		{
			message: '🚨🚨🚨 ATENÇÃO INICIANTES NO TRADE E NOVATOS DO CANAL‼️\n' + '\n' + '\n' +
      '🤑👉 Aqui é SIMPLES, RÁPIDO e FÁCIL para você começar a ganhar dinheiro.\n' + '\n' +
      ' Siga esses 2 passos... \n' +
      '👇👇👇\n' + '\n' + '\n' +
      '✅ (1º PASSO): Comece criando uma conta GRATUITA na Corretora QUOTEX com o nosso link (https://broker-qx.pro/sign-up/fast/?lid=460583) para ganhar R$ 50.000 reais ou $ 10.000 dólares e treinar como LUCRAR COM A GENTE sem ARRISCAR o seu DINHEIRO NO INÍCIO!\n' +'\n' +'\n' +
      '✅ (2º PASSO):  🎥 Assista o vídeo fixado para saber como entrar com a gente nas operações e aproveitar nossos sinais QUOTEX. 😃👍\n' +'\n' +'\n' +
      '🆘 Se precisar de ajuda, MANDE UMA MENSAGEM PARA O NOSSO SUPORTE: https://wa.me/message/RMWFMXEKWKD3B1',
			file: path.join( __dirname, '..', 'imgs', 'comunidade-traders', 'img-1.jpg'),
		},
		{
			message: 'ALCANCE O SUCESSO QUE VOCÊ MERECE COM SUA PRÓPRIA SALA DE SINAIS!\n' + '\n' + '\n' +
      '💰 Seja o proprietário da sua sala de sinais e alcance grandes ganhos!\n' + '\n' +
      '🚀 Ensinamos você a lucrar, vender diariamente e administrar sua sala. Se ganhar acima de R$ 20.000,00 por mês é o seu objetivo, nós podemos ajudar!\n' + '\n' +
      '👉🏻 Vagas limitadas a preço promocional!\n' +'\n' +
      '🚀 💵 Chama agora: https://wa.me/message/RMWFMXEKWKD3B1'
		},
		{
			message: '⚠️ VEM GANHAR DINHEIRO COM A GENTE ‼️\n' +'\n' +
      '👉🏦 Clique para Abrir na QUOTEX - (https://broker-qx.pro/sign-up/fast/?lid=460583)\n' +'\n' +
      '📈🆘📉 Não sabe Operar? Clique aqui e acesse a playlist da Corretora 👉 https://www.youtube.com/@COMUNIDADEDOSTRADERS',
		}
	]
};

// Vip channel ad messages
export const communityOfTradersVipAdvertiseMessages: TAdvertiseMessage = {
	messagesIndexController: makeCounter(),
	messages: [
		{
			message: '🤑📌 TOP SINAIS CATALOGADOS LOGO MAIS.... VAI PERDER?! 🗒👇👇👇\n'+'\n' +
			'👉 🚥 Para saber como pegar nossos sinais, assista o vídeo abaixo: https://youtu.be/HJi_NQsuuK0\n'+'\n' +
			'🚨👉 Abra conta GRÁTIS , ganhe R$ 50.000 ou $ 10.000 para treinar e um BÔNUS da Corretora 🤑👇 (https://broker-qx.pro/sign-up/fast/?lid=460583)\n' +'\n' +
			'🆘 Se precisar de ajuda é só chamar: https://wa.me/message/RMWFMXEKWKD3B1',
		},
		{
			message: '🚨👉 Abra conta GRÁTIS , ganhe R$ 50.000 ou $ 10.000 para treinar e um BÔNUS da Corretora 🤑👇 (https://broker-qx.pro/sign-up/fast/?lid=460583)\n' +'\n' +
			'🆘 Se precisa de ajuda, chama o SUPORTE: https://wa.me/message/RMWFMXEKWKD3B1',
		},
		{
			message: '📊 NÃO ESQUECA❗️De 2ª a 6ª Feira, entre 19h e 22h... Sinais catalogados, dicas, setups, cursos, orientações e materiais GRATUITOS de trade.\n' + '\n' +
			'Somente aqui 🥇😃👍',
		},
		{
			message: '🤑👇\n' +'\n' +
			'Para ganhar dinheiro com a gente, abra conta agora nesse link (https://broker-qx.pro/sign-up/fast/?lid=460583)  e envie o ID para: https://wa.me/message/RMWFMXEKWKD3B1\n' +'\n' +'\n' +
			'Depois, siga as demais orientações que colocamos aqui no Canal.👍🤑',
		},
		{
			message: '🚦🗒 COMO APROVEITAR MELHOR NOSSOS SINAIS TOP❓\n' + '\n' + '\n' +
			'🤑👉 Abra conta GRÁTIS na Corretora: (https://broker-qx.pro/sign-up/fast/?lid=460583)\n' + '\n' +
			'🚨🔂 Se você decidir usar martingale, UTILIZE SOMENTE UM.\n' + '\n' +
			'📈📉 Entre nas operações somente a favor da tendência.\n' + '\n' +
			'❌⛔️ Não entre em todas as operações!\n' + '\n' +
			'🎯👉 Só entre nas operações que aconteceram um GAP em seu favor. \n' + '\n' +
			'⏰👉 Fique atento ao Tempo de Expiração da operação, para qual Corretora é o sinal, se é OTC ou mercado normal.\n' + '\n' +
			'🔢👉 Siga um Gerenciamento inteligente e profissional.\n' + '\n' +
			'😡😞 Não opere se estiver com o seu psicológico abalado de alguma forma.\n' + '\n' +
			'💸🚫 Não opere colocando em risco dinheiro comprometido com contas e sua subsistência. \n' + '\n' +
			'🆓👉 Se precisa saber mais sobre trade, aproveite os materiais GRATUITOS que colocamos aqui de 2ª a 6ª Feira, entre 19h e 22h...'
		},
		{
			message: '❔❓❔❓❔❓❔❓❔❓❔❓❔❓❔\n' + '\n' + '\n' +
			'🤷‍♂️ PERGUNTAS FREQUENTES E RESPOSTAS: 🤷‍♀️\n' + '\n' + '\n' +
			'1️⃣ Por que não manda no Canal o print das operações realizadas?\n' + '\n' +
			'RESPOSTA: Porque se a gente for fazer o print de cada operação para colocar no Canal, pode atrapalhar os Sinais que vão chegando. 📈🌎\n' + '\n' +'\n' +
			'2️⃣ As operações são enviadas por robôs?\n' +'\n' +
			'RESPOSTA: Não! Nós utilizamos uma automação apenas para formatar as mensagens do nosso jeito e  colocar no Canal. 🤖🌐\n' + '\n' + '\n' +
			'3️⃣ Os sinais são assertivos?\n' +'\n' +
			'RESPOSTA: Sim, com certeza! Se você seguir todas as dicas e orientações que damos, a assertividade varia de 88 a 97%. 🎯✅\n' + '\n' + '\n' +
			'4️⃣ É tudo grátis mesmo ou é só pegadinha?\n' + '\n' +
			'RESPOSTA: É tudo realmente grátis e sem pegadinha ou surpresas. Basta abrir uma conta com o nosso código, fazer um depósito inicial de R$ 100,00 na sua conta e movimentar pelo menos R$ 100,00 todo mês.💰🆓\n' + '\n' +'\n' +
			'5️⃣ Mas se eu não quiser abrir conta com o código de vocês e mesmo assim quiser participar do Canal? Tem como?\n' + '\n' +
			'RESPOSTA: Tem sim. Neste caso, você pode optar por pagar uma pequena taxa mensal para participar.😃👍 \n' + '\n' + '\n' +
			'6️⃣ Vocês têm programa de Afiliados?\n' + '\n' +
			'RESPOSTA: Com certeza. Entre em contato com o nosso suporte para saber como ganhar dinheiro como afiliado 🤝🚀\n' + '\n' +'\n' +
			'🚨👉 Abra conta GRÁTIS , ganhe R$ 50.000 ou $ 10.000 para treinar e um BÔNUS da Corretora 🤑👇 (https://broker-qx.pro/sign-up/fast/?lid=460583)  \n' +'\n' +'\n' +
			'🆘 Se precisar de ajuda é só chamar: https://wa.me/message/RMWFMXEKWKD3B1',
		},
		{
			message: '🚀 COMO VOCÊ GANHA DINHEIRO COM A GENTE?\n' + '\n' + '\n' +
      '✅ Abra conta com o nosso código 😃👍\n' + '\n' + '\n' +
      '✅ Aproveite de 50-120 sinais diários de M1, M5 com alta assertividade dos melhores Traders do mundo 🌐🎯\n' + '\n' + '\n' +
      '✅ Assista ao vídeo fixado para saber como pegar os sinais💰😃\n' + '\n' + '\n' +
      '✅ Aproveite nossas Listas de Sinais Catalogados e Lives periódicas 📹📈\n' + '\n' + '\n' +
      '✅ Suporte por telegram, orientação de Contador, Advogado, Psicólogo, Pdf\'s , materiais de gerenciamento, operacional e psicotrade 📚⚖️\n' + '\n' +'\n' +
      '✅ Bônus e descontos especiais 💰🎁',
			file: path.join( __dirname, '..', 'imgs', 'comunidade-traders', 'img-2.jpg'),
		},
		{
			message: '🚨🚨🚨 ATENÇÃO INICIANTES NO TRADE E NOVATOS DO CANAL‼️\n' + '\n' + '\n' +
      '🤑👉 Aqui é SIMPLES, RÁPIDO e FÁCIL para você começar a ganhar dinheiro.\n' + '\n' +
      ' Siga esses 2 passos... \n' +
      '👇👇👇\n' + '\n' + '\n' +
      '✅ (1º PASSO): Comece criando uma conta GRATUITA na Corretora QUOTEX com o nosso link (https://broker-qx.pro/sign-up/fast/?lid=460583) para ganhar R$ 50.000 reais ou $ 10.000 dólares e treinar como LUCRAR COM A GENTE sem ARRISCAR o seu DINHEIRO NO INÍCIO!\n' +'\n' +'\n' +
      '✅ (2º PASSO):  🎥 Assista o vídeo fixado para saber como entrar com a gente nas operações e aproveitar nossos sinais QUOTEX. 😃👍\n' +'\n' +'\n' +
      '🆘 Se precisar de ajuda, MANDE UMA MENSAGEM PARA O NOSSO SUPORTE: https://wa.me/message/RMWFMXEKWKD3B1',
			file: path.join( __dirname, '..', 'imgs', 'comunidade-traders', 'img-1.jpg'),
		},
		{
			message: 'ALCANCE O SUCESSO QUE VOCÊ MERECE COM SUA PRÓPRIA SALA DE SINAIS!\n' + '\n' + '\n' +
      '💰 Seja o proprietário da sua sala de sinais e alcance grandes ganhos!\n' + '\n' +
      '🚀 Ensinamos você a lucrar, vender diariamente e administrar sua sala. Se ganhar acima de R$ 20.000,00 por mês é o seu objetivo, nós podemos ajudar!\n' + '\n' +
      '👉🏻 Vagas limitadas a preço promocional!\n' +'\n' +
      '🚀 💵 Chama agora: https://wa.me/message/RMWFMXEKWKD3B1'
		},
		{
			message: '💰 VENHA PARA NOSSA SALA VIP TOTALMENTE GRATUITA E AUMENTE SEUS LUCROS EM 10X!\n' + '\n' + '\n' +
      '🌟 Você que já está lucrando com nossos sinais grátis... Que tal aumentar seus ganhos sem gastar nada mais! 😱\n' + '\n' +
      '🤑 Interessante, não é?\n' + '\n' +
      '🚀 Basta criar sua conta no Quotex através do nosso link abaixo e enviar o ID da sua conta para o Suporte.\n' + '\n' +
      'Mas corra!  As vagas são limitadíssimas!\n' + '\n' +
      'Clique no link agora... 👇👇👇\n' +'\n' +
      '(https://broker-qx.pro/sign-up/fast/?lid=460583)'
		},
		{
			message: '⚠️ VEM GANHAR DINHEIRO COM A GENTE ‼️\n' +'\n' +
      '👉🏦 Clique para Abrir na QUOTEX - (https://broker-qx.pro/sign-up/fast/?lid=460583)\n' +'\n' +
      '📈🆘📉 Não sabe Operar? Clique aqui e acesse a playlist da Corretora 👉 https://www.youtube.com/@COMUNIDADEDOSTRADERS',
		}
	]
};

// free and vip channel ad messages
export const topTraderTradersAdvertiseMessages: TAdvertiseMessage = {
	messagesIndexController: makeCounter(),
	messages:[
		{
			message: 'TENHA O SUCESSO QUE VOCÊ MERECE COM A SUA PRÓPRIA SALA DE SINAIS!\n' +
      '\n' +
      '🌟 Seja dono da sua Sala de Sinais e fature MUUUUIIITO! 💰\n' +
      '\n' +
      '🚀 Te ensinamos a lucrar, vender diariamente e gerenciar sua Sala. Se ganhar acima de R$ 20.000,00 por mês faz sentido para você?\n' +
      '\n' +
      '👉🏻 Vagas limitadas no preço promocional! \n' +
      '\n' +
      '👉🏻 Link: https://bit.ly/-Sua-Sala-De-Sinais-Agora',
			file: path.join( __dirname, '..', 'imgs', 'top-traders', 'img-1.jpg'),
		},
		{
			message: 'TENHA O SUCESSO QUE VOCÊ MERECE COM A SUA PRÓPRIA SALA DE SINAIS!\n' +
    '\n' +
    '🌟 Seja dono da sua Sala de Sinais e fature MUUUUIIITO! 💰\n' +
    '\n' +
    '🚀 Te ensinamos a lucrar, vender diariamente e gerenciar sua Sala. Se ganhar acima de R$ 20.000,00 por mês faz sentido para você?\n' +
    '\n' +
    '👉🏻 Vagas limitadas no preço promocional! \n' +
    '\n' +
    '👉🏻 Link: https://bit.ly/-Sua-Sala-De-Sinais-Agora',
			file: path.join( __dirname, '..', 'imgs', 'top-traders', 'img-2.jpg'),
		},    
		{
			message: '🤑 ESQUEÇA QUALQUER COISA SOBRE SALA DE SINAIS E PASSE PARA O PRÓXIMO NÍVEL COM A GENTE!\n' +
      '\n' +
      '🌟 Se os nossos Sinais Free já são fantásticos... Imagine VOCÊ ter 10 X mais com nossos sinais de assertividade média 95%, todo santo dia na nossa sala VIP!? 💰\n' +
      '\n' +
      '🚀 E o melhor! A Sala VIP é de graça!😱 Basta criar a sua conta na corretora pelo nosso link, mas se preferir, também pode optar por  investir só R$49,90 por mês para lucrar milhares de reais com a gente!🤩\n' +
      '\n' +
      'Vem lucrar...👇👇👇\n' +
      '\n' +
      '👉🏻 Link: https://bit.ly/Top-Traders-Quotex-Garanta-Agora',
			file: path.join( __dirname, '..', 'imgs', 'top-traders', 'img-3.jpg'),
		},
		{
			message: '💰 VEM PRA NA NOSSA SALA VIP 100% GRATUITA LUCRAR 10X MAIS!\n' +
      '\n' +
      '🌟SIIIMMM! EU SEI! Você já está lucrando com nossos Sinais Free? Mas, que tal lucrar 10x mais sem pagar nada!😱\n' +
      '\n' +
      '🤑Gostou né!?\n' +
      '\n' +
      '🚀 Basta criar sua conta no Quotex pelo nosso link abaixo e enviar o ID da sua conta ao Suporte.\n' +
      '\n' +
      'Mas corre tá! As Vagas limitadíssimas!\n' +
      '\n' +
      'Clique no link agora...👇👇👇\n' +
      '\n' +
      '👉🏻 Link: https://bit.ly/Corretora-Quotex-Clique-Aqui',
			file: path.join( __dirname, '..', 'imgs', 'top-traders', 'img-4.jpg'),
		},
		{
			message: '📉📈  COMO APROVEITAR NOSSOS SINAIS❓\n' +
      '\n' +
      '\n' +
      '🚨 NÃO RECOMENDAMOS O USO DE MARTINGALE, PORÉM, SE VOCÊ DECIDIR USAR, SUGERIMOS QUE UTILIZE SOMENTE 1 MARTINGALE (SE NECESSÁRIO) 🚨\n' +
      '\n' +
      '\n' +
      '⚠️ 👉 🔎 FILTRE AS OPERAÇÕES:\n' +
      '\n' +
      '✔️ Verifique a tendência e entre somente a favor da tendência.\n' +
      '\n' +
      '❌ Não entre em todas as operações! Você tem mais de 100 por dia. 😃 \n' +
      '\n' +
      '👉 Dê preferência para entrar nas operações que aconteça um GAP em seu favor. \n' +
      '\n' +
      '⏰ Fique atento ao Tempo de Expiração da operação.\n' +
      '\n' +
      '🔢 Siga um Gerenciamento inteligente e profissional.\n' +
      '\n' +
      '🤯 Não opere se estiver com o seu psicológico abalado de alguma forma.\n' +
      '\n' +
      '🚫 Não opere colocando em risco dinheiro comprometido com contas e sua subsistência. \n' +
      '\n' +
      '\n' +
      '💲👉 Se precisa saber \n' +
      'mais sobre trade entre em contato com o nosso suporte e solicite materiais GRATUITOS 🆓',
		},
		{
			message: '⚠️ VEM GANHAR DINHEIRO COM A GENTE ‼️\n' +'\n' +
      '👉🏦 Clique para Abrir na QUOTEX - https://bit.ly/Corretora-Quotex-Clique-Aqui\n' +'\n' +
      '📈🆘📉 Não sabe Operar? Clique aqui 👉 Parte 1 - https://youtu.be/cADBvpgk7WU\n' +'\n' +
      '👉 Parte 2 - https://youtu.be/k4MC2IAzHjE',
		}
	]
};
