import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import tableList from './data/list.json'

const mock = new axiosMockAdapter(axios);

const Mock = () => {
    mock.onGet('/addtask').reply(config => {
        let list = {
            checked: false,
            name: config.value,
            state: 1
        }
        tableList.push(list)
        return [200, tableList]
    })

    mock.onPost('/list').reply(config => {
        if (!config.data) {
            return [200, tableList]
        } else {
            let list = [];
            tableList.forEach(item => {
                if (item.state === config.data) {
                    list.push(item)
                }
            });
            return [200, list]
        }
    })

    mock.onGet('/checked').reply(config => {
        tableList.forEach(item => {
            if (item.name === config.item.name) {
                item.checked = !item.checked;
                item.state = item.checked ? 2 : 1;
            }
        });
        return [200, tableList]
    })

    mock.onGet('/delete').reply(config => {
        tableList.forEach(item => {
            if (item.name === config.items.name) {
                tableList.splice(tableList.indexOf(item), 1)
            }
        });
        return [200, tableList]
    })
}

export default Mock;