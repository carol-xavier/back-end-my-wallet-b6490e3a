import financialRepository from "./../repositories/financialRepository.js";

export async function postFinancialTransaction (req,res) {
    try {    
        const { value, type } = req.body;
    
        if (!value || !type) {
          return res.sendStatus(422);
        }
    
        const financialTypes = ["INCOME", "OUTCOME"];
        if (!financialTypes.includes(type)) {
          return res.sendStatus(422);
        }
    
        if (value < 0) {
          return res.sendStatus(422);
        }
    
        await financialRepository.postTransactionEvent(user.id,value,type);    
        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function getFinancialTransaction (req,res) {
    try {    
        const events = await financialRepository.getTransactionEvents(user.id);
    
        res.send(events.rows);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function sumFinancialTransactions (req,res) {
    try {    
        const events = await financialRepository.sumTransactions(user.id); 
    
        const sum = events.rows.reduce(
          (total, event) =>
            event.type === "INCOME" ? total + event.value : total - event.value,
          0
        );
    
        res.send({ sum });
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}