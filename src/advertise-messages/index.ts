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

export const communityOfTradersAdvertiseMessages : TAdvertiseMessage = {
	messagesIndexController: makeCounter(),
	messages:[
		{
			message: '⚠️🚨🚨🚨 ATENÇÃO INICIANTES NO TRADE E NOVATOS DO CANAL‼️\n' +
      '\n' +
      '\n' +
      '👉🤑 Antes de mais nada, SAIBA QUE PARA PARTICIPAR DO NOSSO CANAL E LUCRAR COM A GENTE... É GRÁTIS!\n' +
      '\n' +
      '\n' +
      '🤑👉 Aqui é tão SIMPLES, RÁPIDO e FÁCIL para você começar a ganhar dinheiro, que você só precisa seguir esse 2 passos... \n' +
      '👇👇👇\n' +
      '\n' +
      '\n' +
      '✅ (1º PASSO): Crie conta GRATUITAMENTE com o nosso link (https://broker-qx.pro/sign-up/fast/?lid=460583) na Corretora QUOTEX para ganhar R$ 50.000 reais ou $ 10.000 dólares e treinar como LUCRAR COM A GENTE sem ARRISCAR o seu DINHEIRO NO INÍCIO!\n' +
      '\n' +
      '👉 VOCÊ PODE TESTAR a assertividade das NOSSAS OPERAÇÕES com RISCO ZERO!🤑👌\n' +
      '\n' +
      '\n' +
      '✅ (2º PASSO):  🎥 Assista o vídeo abaixo para saber como: \n' +
      '\n' +
      '🔸 Como depositar na QUOTEX;💱🪙\n' +
      'e\n' +
      '🔸Como entrar com a gente nas operações e aproveitar nossos sinais. 😃👍\n' +
      '__\n' +
      '__\n' +
      '\n' +
      '🆘 Se precisar de ajuda, MANDE UMA MENSAGEM PARA O NOSSO SUPORTE: https://wa.me/message/RMWFMXEKWKD3B1\n' +
      '__\n' +
      '__\n' +
      '\n' +
      '📊 Daqui a pouco enviaremos mais dicas de como operar e informações sobre como funciona o nosso Canal GRATUITO😃👍👍👍',
			file: path.join( __dirname, '..', 'imgs', 'comunidade-traders', 'img-1.jpg'),
		},
		{
			message: '🚀 COMO VOCÊ GANHA DINHEIRO AQUI?\n' +
    '\n' +
    '\n' +
    '✅ TOTALMENTE GRATUITO para quem abrir conta com o nosso código 😃👍\n' +
    '\n' +
    '✅ Sinais dos melhores Traders Internacionais da QUOTEX 24 horas por dia, com maior intensidade das 00:00 às 14:00, incluindo tardes, noites e fins de semana, com variações 🌐📈\n' +
    '\n' +
    '✅ Enviamos 50-120 sinais diários de M1, M5 e outros tempos, focando em assertividade 📊🎯\n' +
    '\n' +
    '✅ Para pegar os nossos sinais, basta entrar com PUT/VENDA (🔴👇) ou CALL/COMPRA (🟢👆). Assista ao  vídeo fixado ou contate nosso suporte 🧑‍💻🧑‍💻\n' +
    '\n' +
    '✅ Lista de Sinais Catalogados e Lives periódicas 📹📈\n' +
    '\n' +
    '✅ Suporte por telegram em até 24h, orientação de Contador, Advogado, Psicólogo, Pdf\'s , materiais de gerenciamento, operacional e psicotrade 📚⚖️\n' +
    '\n' +
    '✅ Bônus e descontos especiais 💰🎁\n' +
    '\n' +
    '🚨👉 Crie AGORA GRATUITAMENTE conta com o nosso link para ganhar R$ 50.000 reais ou $ 10.000 dólares e treinar como e BÔNUS DA CORRETORA 🤑👇 (https://broker-qx.pro/sign-up/fast/?lid=460583)  \n' +
    '\n' +
    '🆘 Precisa de Ajuda? Chama o SUPORTE: https://wa.me/message/RMWFMXEKWKD3B1',
			file: path.join( __dirname, '..', 'imgs', 'comunidade-traders', 'img-2.jpg'),
		},
		{
			message: '😲🤑😃🎁📉🤑📈🙂😃👇👇👇\n' +
    '\n' +
    '🎁 VANTAGENS E BENEFÍCIOS POR OPERAR COM A GENTE:😃👍\n' +
    '\n' +
    '\n' +
    '✨ Os sinais mais assertivos do mundo; 🎯\n' +
    '\n' +
    '🆓 Acesso Gratuito, basta utilizar nosso código;\n' +
    '\n' +
    '📊 De 50 a 120 sinais durante todo o dia; ⏰\n' +
    '\n' +
    '📑 Lista de Sinais Catalogados e Assertivos; 📈\n' +
    '\n' +
    '📚 Materiais sobre trade e mentoria gratuita; 📖💡\n' +
    '\n' +
    '👩‍⚖️ Orientação de Contador, Advogado e Psicotrade; 📈💼🧘‍♂️\n' +
    '\n' +
    '🚨👉 Crie AGORA GRATUITAMENTE uma conta com o nosso link para ganhar R$ 50.000 reais ou $ 10.000 dólares e treinar como e BÔNUS DA CORRETORA 🤑👇 (https://broker-qx.pro/sign-up/fast/?lid=460583)  \n' +
    '\n' +
    '\n' +
    '🆘 Precisa de Ajuda? Chama o SUPORTE: https://wa.me/message/RMWFMXEKWKD3B1\n' +
    '\n' +
    '\n' +
    '📊 Daqui a pouco enviaremos mais dicas de como operar e informações sobre o nosso Canal GRATUITO😃�👍👍',
		},
		{
			message: '❓❔❓❔❓❔❓❔❓❔❓❔❓❔❓❔\n' +
    '\n' +
    '🤷‍♂️ PERGUNTAS FREQUENTES E RESPOSTAS: 🤷‍♀️\n' +
    '\n' +
    '\n' +
    '1️⃣ Por que não manda no Canal o print das operações realizadas?\n' +
    '\n' +
    'RESPOSTA: Porque as operações que fazemos são fruto de análise dos Traders de várias partes do mundo que chegam a todo momento. Portanto, se a gente for fazer o print de cada operação para colocar no Canal, pode atrapalhar os Sinais que vão chegando. 📈🌎\n' +
    '\n' +
    '\n' +
    '2️⃣ As operações são enviadas por robôs?\n' +
    '\n' +
    'RESPOSTA: Não! Nós utilizamos uma automação apenas para formatar as mensagens do nosso jeito e  colocar no Canal. 🤖🌐\n' +
    '\n' +
    '\n' +
    '3️⃣ Os sinais são assertivos?\n' +
    '\n' +
    'RESPOSTA: Sim, com certeza! Se você seguir todas as dicas e orientações que damos, a assertividade varia de 90 a 97%. 🎯✅\n' +
    '\n' +
    '\n' +
    '4️⃣ É tudo grátis mesmo ou é só pegadinha?\n' +
    '\n' +
    'RESPOSTA: Sim! Sem pegadinha, sem surpresa. Basta abrir uma conta com o nosso código, fazer um depósito inicial de R$ 100,00 na sua conta e movimentar pelo menos R$ 100,00 todo mês.💰🆓\n' +    '\n' +
    '\n' +
    '5️⃣ Mas se eu não quiser abrir conta com o código de vocês e mesmo assim quiser participar do Canal? Tem como?\n' +
    '\n' +
    'RESPOSTA: Tem sim. Neste caso, você pode optar por pagar uma pequena taxa mensal no valor de R$ 49,90 para participar.😃👍 \n' +
    '\n' +
    '\n' +
    '6️⃣ Vocês têm programa de Afiliados?\n' +
    '\n' +
    'RESPOSTA: Com certeza. Entre em contato com o nosso suporte que vamos te orientar. 🤝🚀\n' +
    '\n' +
    '\n' +
    '🚨👉 Crie AGORA GRATUITAMENTE conta com o nosso link para ganhar R$ 50.000 reais ou $ 10.000 dólares e treinar como e BÔNUS DA CORRETORA 🤑👇 (https://broker-qx.pro/sign-up/fast/?lid=460583) \n' +
    '\n' +
    '\n' +
    '🆘 Precisa de Ajuda? Chama o SUPORTE: https://wa.me/message/RMWFMXEKWKD3B1\n' +
    '\n' +
    '\n' +
    '📊 Daqui a pouco enviaremos mais dicas de como operar e informações sobre o nosso Canal GRATUITO😃�👍👍',
		},
		{
			message: '🌟 VOCÊ NÃO ESTÁ VIVENDO UM SONHO! É VERDADE MESMO!!! 🌈\n' +
    '\n' +
    '\n' +
    'Existe uma Sala de Sinais GRATUITA para pessoas novatas no trade ou que não sabem operar, ganharem dinheiro todo dia somente copiando e colando dezenas de operações SEM GALE. 🚀 \n' +       
    '\n' +
    'Essas operações são enviadas após análises dos melhores traders do mundo e ainda fornecem orientação de contadores, advogados, psicólogos, mentoria, materiais educacionais para trade e ferramentas de extrema qualidade.\n' +
    '\n' +
    'Sim! Essa Sala está AQUI NESTE CANAL!\n' +
    '\n' +
    'Então, esqueça tudo o que você conhece sobre Sala de Sinais, porque a gente vai pegar na sua mão e levar você ao sucesso! 🌟💼💰\n' +
    '\n' +
    '\n' +
    '🚨👉 Crie AGORA GRATUITAMENTE conta com o nosso link para ganhar R$ 50.000 reais ou $ 10.000 dólares e treinar como e BÔNUS DA CORRETORA 🤑👇 (https://broker-qx.pro/sign-up/fast/?lid=460583)  \n' +
    '\n' +
    '\n' +
    '🆘 Precisa de Ajuda? Chama o SUPORTE: https://wa.me/message/RMWFMXEKWKD3B1\n' +
    '\n' +
    '\n' +
    '📊 Daqui a pouco enviaremos mais dicas de como operar e informações sobre o nosso Canal GRATUITO😃�👍👍',
		},
		{
			message: '🚨👉 Crie AGORA GRATUITAMENTE conta com o nosso link para ganhar R$ 50.000 reais ou $ 10.000 dólares e treinar como e BÔNUS DA CORRETORA 🤑👇 (https://broker-qx.pro/sign-up/fast/?lid=460583)  \n' +
    '\n' +
    '🆘 Precisa de Ajuda? Chama o SUPORTE: https://wa.me/message/RMWFMXEKWKD3B1\n' +
    '\n' +
    '📊 Daqui a pouco enviaremos mais dicas de como operar e informações sobre o nosso Canal GRATUITO😃�👍👍',
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
		}
	]
};

export const topTraderTradersAdvertiseMessages : TAdvertiseMessage = {
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
		}
	]
};
