import amqp from 'amqplib/callback_api.js';

// import { getTransferHistoryByTxHash } from "../getTransaction.js";

import axios from 'axios';

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, async function (msg) {
            try {
                console.log('소비 중,,,');
                const txHash = msg.content.toString();
                console.log(txHash);
                setTimeout(async function() {
                    const result = await getTransferHistoryByTxHash(txHash);    
                    console.log(result);
                }, 3000);
                
            } catch (error) {
                console.error(error);
            }
            // console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});


async function getTransferHistoryByTxHash(txHash) {
    var config = {
        method: 'get',
        url: `https://th-api.klaytnapi.com/v2/transfer/tx/${txHash}`,
        headers: {
            'x-chain-id': '1001',
            'Authorization': 'Basic S0FTS0NGVTdUVTdLTkxUUjhKVFZQMVBDOnh6UWpkUE9zMWpWazBnd2FRNVBPc0lBcWoxREhxM3U4M25Qd0xNWXE='
        }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}