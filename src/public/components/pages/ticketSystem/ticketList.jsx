import { connect } from 'react-redux';
import addressData from '../addressData';
import moment from 'moment';
import { ajaxRequest } from "../../actions/ajaxReducer";
const icon_23 = require("src/public/images/icon_23.png");

class TicketList extends React.Component{
  constructor() {
    super();
    this.state = {
      time: "",
      consuming: "",
      price: ""
    }
  }
  componentWillMount() {
    const { ticketSystem } = this.props;
    // ajaxRequest({
    //   data: {
    //     funcNo: "100501",
    //     date: ticketSystem.ticket_date,
    //     from_station: ticketSystem.ticket_place_start_flag,
    //     to_station: ticketSystem.ticket_place_end_flag,
    //     purpose_codes: ticketSystem.student_ticket ? "OXOO" : "ADULT",
    //   },
    //   successFunc: function(data) {
        let data = {"data":{"data":{"flag":"1","map":{"GBQ":"广州北","GGQ":"广州东","GZQ":"广州","IOQ":"深圳北","IZQ":"广州南","NZQ":"福田","SZQ":"深圳"},"result":["|预订|6c000G654303|G6543|IZQ|NZQ|IZQ|IOQ|19:10|19:46|00:36|N|me1HOIe2sE7im6e%2FGSMbBbtI6zGys2mXGVdv4Ce8bmX%2FpjxT7Kq%2BbFLq%2FaezJhdg7Thq%2BlX7qfo%3D|20180320|3|Q6|01|03|1|0||||||无|无||||无|无|无||O090O0M0P0|O9OMP|1","maFxbJ9Lp7yAyrfyUlJlGNapfVXj25mO%2BKCHwjcIcAm0uZfQJ9q2CTj%2FgmAEUsULyM8BoAvoWoqC%0AjItR77zdgWEsunjtynhuJt88HM6XCRdFyZ7pvBe8XxgjuHP4zMUUFQt24btHc5tRXdNk9qFF2KyR%0AhOZsnxC7qNcfw%2BoZ6bmfHaUIzqCsXdMvtW53eI%2FCcN%2F7VQaxIXf87IYz3tBTmk8FOtui%2FZBa2K4B%0A813yIK5VLPlTOUhi5MXBE8e7KF%2FA|预订|65000C703904|C7039|GGQ|SZQ|GGQ|SZQ|19:22|20:37|01:15|Y|ep%2BDX4NnpdvZUOBpLGmfkRu69hX9XxMFUim9I4a0rdb%2BCtph|20180320|3|Q2|01|05|0|0|||||||有||||有|无|||O0O0M0|OOM|0","tNY82xLt5u3SpecaLYkHYVtP9bqsbnyTKEHnLIBWnHNsoUzWQ50PE57KOD68%2FwRrFxlHo%2FapXmQK%0AbHj6oFoTmg6%2BrINLMXNDd9VM1XYVFvZFDSIFjmIU5fSOeePLIv%2FBB2tIPKOj%2Bl%2BEOxjhf654c6wY%0A3eXKm3A4XpEf8H0F0SdgpG0k5W05c6doMaYrjzjRzNUrkK69NU4bV2eTblmJctgF3p7CxjxeRt2S%0A53iK1kk1gMI1OkuCLP9p2fosjgIo|预订|65000C718107|C7181|GGQ|SZQ|GGQ|SZQ|19:40|20:56|01:16|Y|wRzTivT2J2KNA1FyuErErvZ2UHvf5HY27C5NrmkzQatNstV9|20180320|3|Q2|01|05|0|0|||||||有||||有|有|||O0O0M0|OOM|0","|预订|62000G648803|G6485|SYQ|NZQ|IZQ|NZQ|19:44|20:30|00:46|N|WhmRzQC%2FPeYIF96WAsz70%2FW1m4QYPHgdBjxMe4SkDlMp%2BPsn3yfsafliYS4%3D|20180320|3|Q7|11|13|1|0|||||||无||||无|无|无||O090M0O0|O9MO|1","|预订|77000G131404|G1311|CUW|IOQ|IZQ|IOQ|19:49|20:25|00:36|N|PE%2BpHuljPbIsKw00ZalFRXgSLPbz0ExDYXZ37EgYQBhxAcy2|20180320|3|W1|18|20|1|0|||||||||||无|无|无||O0M090|OM9|1","aIIyeSJomlhKeJxObCQBJwaEkPMD%2FQXlmAKPjPlktZXj8hW0lBNwmkKNark4HE8dFuVdvvKov48J%0AjLnJhj7tno9659cqO%2BQQS6D9uslJobsxGX7r6l8bvtWZ6X3FCw4ZyMJItJbtm8H%2BgiSGacguLCZs%0ABY3AVEEwjjWW%2F3zljTqf5MVQlTYFDRXmIu5sn9GM0CyYCtdkDEOQQPfOr2yN9QpU4AFdwWPRwcfI%0AV6Cg%2Ba9klAzSQFsdbCaTkvLb%2FouV|预订|65000C705905|C7059|GGQ|SZQ|GGQ|SZQ|19:51|21:10|01:19|Y|uKXnJFi45Rt7%2F4BDYowQPcEQjbkMnsmpl%2B%2BHj0y1xZa9mXBp|20180320|3|Q2|01|06|0|0|||||||有||||有|无|||O0O0M0|OOM|0","|预订|4f0000G8240I|G821|EAY|IOQ|IZQ|IOQ|19:54|20:30|00:36|N|PE%2BpHuljPbIsKw00ZalFRXgSLPbz0ExDYXZ37EgYQBhxAcy2|20180320|3|Y2|13|15|1|0|||||||||||无|无|无||O0M090|OM9|0","k8WfsVdgq3ev7eNXSIfp6uWJFf0sl8v9KlToLa2OIYINh%2FbCPWv8fMRxk4AhtUsMRShygVlBTTRB%0ABIlS2KJ%2FsNoDN%2FKq64Ul5kyEoTmlYDosdIcPboJIgRB%2F9SASlWp6VJwoTNyh2%2FQdHHHZ%2FkJ8R8w4%0A6cP8vzjxEoyAuqAOMlYa6QdZwOyYbIFq%2FSfQGFDcABh213g125W3caHGEsKQTR8qiEvg%2BOv4VXM0%0ALgFpge4OwbVYqExvhafgg%2BQ%3D|预订|63000C706901|C7069|GZQ|SZQ|GZQ|SZQ|19:55|21:23|01:28|Y|WUgeB1spdU%2BVgSgHgBNW07BORildfZzNGRzDbDJSTF13fpUn|20180320|3|Q2|01|06|0|0|||||||有||||有|有|||O0O0M0|OOM|0","|预订|4e000G101905|G1019|WHN|IOQ|IZQ|IOQ|20:04|20:40|00:36|N|PE%2BpHuljPbIsKw00ZalFRXgSLPbz0ExDYXZ37EgYQBhxAcy2|20180320|3|N2|07|09|1|0|||||||||||无|无|无||O0M090|OM9|1","|预订|6c000G62010F|G6201|IZQ|NZQ|IZQ|IOQ|20:10|20:46|00:36|N|WlyPgNowqopOln1Uvcfkcf1IJbyX2fRH%2B3as6Gva1gCNiiqNqrkfu9TI1fY%3D|20180320|3|Q6|01|03|1|0|||||||无||||无|无|无||O090O0M0|O9OM|1","|预订|6c000G625702|G6257|IZQ|IOQ|IZQ|IOQ|20:15|20:51|00:36|N|b%2BkstZ%2FpgQVY6seAn8bIoQdG1r9gRTzkfhEU%2BtcBRE7WyncFdoNgu3h%2BFNM%3D|20180320|3|Q9|01|03|1|0|||||||无||||无|无|无||O090M0O0|O9MO|1","|预订|6c000G62550M|G6255|IZQ|IOQ|IZQ|IOQ|20:20|20:56|00:36|N|b%2BkstZ%2FpgQVY6seAn8bIoQdG1r9gRTzkfhEU%2BtcBRE7WyncFdoNgu3h%2BFNM%3D|20180320|3|Q7|01|03|1|0|||||||无||||无|无|无||O090M0O0|O9MO|1","ZFGqZdi1hyK5tMnltHLgRCeOeBF45XPiP43hr0KXwwDPKHzFZ%2F%2FnzImTaHd1j9tHWS1VqOLgxAv7%0AdVGQhe7ROC4Sg3lo3iGwNZy8VPFb0tw3r8%2Fm%2BYrdvZgt1ZnOCVupEgVyCsM%2Fw9VhfLUP4aja4pEg%0AJo80B2kqkA6Rio%2BuY9rowE8%2BOD5O8RJ9PgS7jhQjnzdF2bx2cGtqkqTMdbzSx3%2F1eITw1zWrQdqO%0AuELbyP8shCdccxsnrriDrFDd3fcUCgJZpQ%3D%3D|预订|62000K91210E|K9121|HYQ|SZQ|GZQ|SZQ|20:25|22:20|01:55|Y|Ytg5T0QWnp%2By53eG0Mr8Xjeghx6rAfkhPco%2BaWV4zQ5NxcTUWzWevowRAMA%3D|20180320|3|Q7|06|08|0|0||||有|||有||有|有|||||10401030|1413|1","|预订|71000G290506|G2905|GBZ|IOQ|IZQ|IOQ|20:31|21:00|00:29|N|PE%2BpHuljPbIsKw00ZalFRXgSLPbz0ExDYXZ37EgYQBhxAcy2|20180320|3|Z1|03|04|1|0|||||||||||无|无|无||O0M090|OM9|1","xvoc02kGyEFH9Qli9gPEbP28%2BgPBlxb0X7ODx%2FhrMHw1ONCAQc1yRpWl2067xVeSUQG3SZyaPFpl%0An5BCFuGXZRTp9r0BGtWTTMf1AAkNBUiQRNvN%2FTN%2B6GtwqraeXfO0s%2Fy3EA8mSLSts6hmIUu1f0ur%0AheDtHBpFYn9SPPfYoM203Z3EHM8nuZoMbhxo2QBxx0F2gSHFnogDU%2FU3IFhlNBTbDMp6iYJH%2Fwqn%0AMC8AFuuEWOWP6ul2v4KZgkTyIk6Y|预订|65000C709305|C7093|GGQ|SZQ|GGQ|SZQ|20:32|21:48|01:16|Y|gxxbg7qe9k62dnlqVKY6mNQHQxBF8zXSqViK7rf3tOwaOba8|20180320|3|Q2|01|05|0|0|||||||有||||有|无|||O0M0O0|OMO|0","|预订|6c000G634501|G6345|IZQ|CBQ|IZQ|IOQ|20:36|21:12|00:36|N|b%2BkstZ%2FpgQVY6seAn8bIoQdG1r9gRTzkfhEU%2BtcBRE7WyncFdoNgu3h%2BFNM%3D|20180320|3|Q6|01|03|1|0|||||||无||||无|无|无||O090M0O0|O9MO|0","e7Xmp4NY7FN6oMjxr0ZuBj0W%2Fs42TlbTJ%2B81PsNchBb%2F0WE4pD72mt929hIsIkBHx9Hc1L8VgqbE%0Ahqd%2B30kDJg3RKgKIAZR8JiZMNNSLtuci9yIn8tn3XR%2FLkSlJXIDZLS4gzMx2ae5Cq0VCoLT91h72%0ArxiXCEl%2B%2BXrq6dU7%2B98TmTM7UD7U4N8aPWsqEEkYoWiJKbWkGqg3rQuPich6B5k7MjC%2BonizLebl%0Am7Lsc1mCbrK4lbiuOdYI3Kooi91o|预订|65000C713904|C7139|GGQ|SZQ|GGQ|SZQ|20:46|22:02|01:16|Y|VLmffY%2FIx7ujbuA3pWIKaLte6aWNSgQXtx7XDpfpszEO4C%2BI|20180320|3|Q2|01|05|0|0|||||||有||||有|有|||O0O0M0|OOM|0","OP1CZ5CIxivmDlEY1ADzAsjjmhfXW8RT8FMQ3SrLEaPfgiZIsMbNmPJjDjvvWqyQiUyb4BcNQHnU%0At2o0G8yTtb0OCnJOnnRBXXbjg0cPZLs7cIQ6se2mjHgx9iV8McYaPwViahhCibNBpNZqPz6ftE95%0AblHeUbE8SBjbjpbTMuUQ8LSOMBtqav%2BtcFxtAZYyDaqpXkUbqEwvgP4jVI5lTRhLm9bf9Bqpiwiq%0AqiV2olzNW7qyKbJa%2BNdFkPUVfbpHBu89dP%2FbT7EoZVRJ|预订|6c000G60250I|G6025|CWQ|IOQ|GBQ|IOQ|20:49|21:45|00:56|Y|0oR1Oe%2BBECj55FFR72g%2Fa3s%2B0g4%2BWSH%2F%2FrzKwGVHota%2B5m%2FeYLd9TPMdfdE%3D|20180320|3|Q6|05|07|1|0|||||||无||||1|无|13||O090M0O0|O9MO|1","iN399XdJSW%2FCabgqRztApsmgLS3MHOlr%2Bzux5TvM0QAxN7IzErlCGpLz7hmBnRxEgYMUXmBCTX4B%0AGfgMaDtzPDUUP5Pw5XtwO5do1%2FyVcvXrY5wKgqM5WVvASbu%2BM%2BpDNlNt7LtYUk4Ky1YC%2B6xKZoxC%0A5pOn5ONwD6AaLS3QGmTlShmCqr5cSKe7P23zx5QwXikZue9LgewqpyTBZ11dmmSszKFf1U8wps1j%0ASWQuIRbi7%2FFs4alGEWaQRrE%3D|预订|63000C710301|C7103|GZQ|SZQ|GZQ|SZQ|20:52|22:22|01:30|Y|uCRBTtxO%2FsklLIZjllbxg1afFFordy5G2tbmuRW%2FRvzdkb7N|20180320|3|Q2|01|06|0|0|||||||有||||有|有|||O0M0O0|OMO|0","|预订|6c000G603303|G6033|YIQ|IOQ|IZQ|IOQ|20:58|21:34|00:36|N|KaEHiGbhD3XOaC7%2FAqJrI5ChTIYUSq7iBU40wNcY5539ECT0YjtBgL66QEw%3D|20180320|3|Q6|07|09|1|0||||||无|无||||无|无|||O0M0O0P0|OMOP|1","|预订|3800000G7509|G75|ADF|IOQ|IZQ|IOQ|21:04|21:40|00:36|N|PE%2BpHuljPbIsKw00ZalFRXgSLPbz0ExDYXZ37EgYQBhxAcy2|20180320|3|F1|14|16|1|0|||||||||||无|无|无||O0M090|OM9|1","|预订|6c000G622708|G6227|IZQ|IOQ|IZQ|IOQ|21:10|21:50|00:40|N|um8sEdBx6VpUWQiJk04hm5yOjTY3qpoAbnb2S16d7g90ULYxW647WKpuPUHiqgzVJ3J9%2BG1RGLQ%3D|20180320|3|Q7|01|03|1|0||||||无|无||||无|无|无||O090M0O0P0|O9MOP|1","|列车停运|63000C707503|C7075|GZQ|SZQ|GZQ|SZQ|24:00|24:00|99:59|IS_TIME_NOT_BUY||20180320||Q2|01|07|0|1|||||||||||||||||0","4Wqzofa19DuCk9CCb%2Bs%2BJAdvexUIy9DIxaapBQAY3UrdXXv4CwGlXie9n9yVK1Dvwjs5VJ4kr5YC%0AOsYyXRUP62Rnz7%2B%2BZhXC2FXVsPEBL3I5YHxtja%2B%2BvgoSPjo5ph9lowaDB9v9ISF3P4iWopFBNYBu%0AmHgymw59CkXlgcEKFwmHPInVn6nyjuprQhJeemJDHY%2Fjhh%2F%2B%2F0Uc8Pk1jwjhHls9RjhQC2QrR4aE%0ADCdyFdred4kiQuxsyaT8iWVXunWe8h5h7LJ3aH%2FPeQrH|预订|6c000G634100|G6341|IZQ|CBQ|IZQ|IOQ|21:21|21:57|00:36|Y|7VpwyAQm0dWHQZfaAQX%2B%2BZZtRH89reBjSz8AkpCqSKHuNE4FbgwcTqSSiVY%3D|20180320|3|Q6|01|03|1|0|||||||无||||无|无|4||O090O0M0|O9OM|0","|预订|4e000G10210B|G1021|WHN|IOQ|IZQ|IOQ|21:26|22:02|00:36|N|PE%2BpHuljPbIsKw00ZalFRXgSLPbz0ExDYXZ37EgYQBhxAcy2|20180320|3|N2|08|10|1|0|||||||||||无|无|无||O0M090|OM9|1","|预订|6c000G654903|G6549|IZQ|NZQ|IZQ|IOQ|21:35|22:11|00:36|N|me1HOIe2sE7im6e%2FGSMbBbtI6zGys2mXGVdv4Ce8bmX%2FpjxT7Kq%2BbFLq%2FaezJhdg7Thq%2BlX7qfo%3D|20180320|3|Q9|01|03|1|0||||||无|无||||无|无|无||O090O0M0P0|O9OMP|1","|列车停运|65000C710906|C7109|GGQ|SZQ|GGQ|SZQ|24:00|24:00|99:59|IS_TIME_NOT_BUY||20180320||Q2|01|05|0|1|||||||||||||||||0","|预订|71000G291504|G2915|NFZ|IOQ|IZQ|IOQ|21:48|22:24|00:36|N|PE%2BpHuljPbIsKw00ZalFRXgSLPbz0ExDYXZ37EgYQBhxAcy2|20180320|3|Z1|06|08|1|0|||||||||||无|无|无||O0M090|OM9|1","AdcIakQa1xx9fJJjmuaCtKeYtXAf9H8LN0e7l4TjRKBv8teo1l4ufMKUoajlbXg7tJY4GNQGw4kM%0AaHKBD0jWwmd9XtsotOej5Ab2wlSdpp3dStmpVHe0ixOIO0WlnBWGNL34TsJT8ePL2fAqOIZaz6d4%0A3anpab5HpnLxWyiyK4%2BUdJydtgjYpK9eufxfCTzl93mTl9dGmq7KL5oIo8posDpAs99aRq19KDWj%0A08H9wzMcVTTuiv7tNGp2ZI8%3D|预订|63000C701104|C7011|GZQ|SZQ|GZQ|SZQ|21:50|23:22|01:32|Y|Q4qnaW02wC8xYLIeqv9%2BPHnIs5OJoZVQXbcWlqSwi49cHFX7|20180320|3|Q2|01|07|0|0|||||||有||||有|无|||O0M0O0|OMO|0","|预订|4f0000G8280O|G825|EAY|IOQ|IZQ|IOQ|21:53|22:35|00:42|N|PE%2BpHuljPbIsKw00ZalFRXgSLPbz0ExDYXZ37EgYQBhxAcy2|20180320|3|Y2|14|16|1|0|||||||||||无|无|无||O0M090|OM9|1","|预订|80000G292805|G2925|KOM|IOQ|IZQ|IOQ|21:59|22:30|00:31|N|PE%2BpHuljPbIsKw00ZalFRXgSLPbz0ExDYXZ37EgYQBhxAcy2|20180320|3|M1|05|08|1|0|||||||||||无|无|无||O0M090|OM9|1","pc0SA6%2FjhPtBPtPuSxD5Kql4cregEKCE2MkRdlpA9YAMIee4oCZWrzki2JoVQOLEikz24Yd3vc4W%0Auc%2FTtP9iwYujOCE6O73RpWQwXxygzrXQyCICPYFrPhwtRkf7ICRTJII%2FaDPRCnB7%2BWnEEymvpcMb%0AFU2S6jcO0Z7zB62iv55wleWzVFOaT2VbSbSb3%2FwHpTczgnHL88411TSL%2BpnG%2FETsY2%2BThn1Tescu%0AXIUX9YBlKF1fK5IJzcmOyDzj8oeQ|预订|65000C712905|C7129|GGQ|SZQ|GGQ|SZQ|22:15|23:31|01:16|Y|1379S2Sj%2Fw73h6h1WooWht%2BDQ1bw3wHTJgg28qGYPwucXEG5|20180320|3|Q2|01|05|0|0|||||||有||||有|有|||O0O0M0|OOM|0","RxC1YW86dXVvgf%2FWDA8fF4fHRE7aao3GcSiWJVbJBRr%2BfDSpndCFHdhFGGnRASyu8LA7NyYpdnZR%0AwnR9C1yZl5LeIqWgTTWei7%2FVPC%2FgPacprHLKcUSNRzOFwptnnVN4DnCVGcxxVdbUJyUHJfsI9NTK%0Adhkxcec9Fvv%2FXhz%2B4%2F32tzxHzjqwBrT%2Fy2XmfChL4Z79WKGcPxnbz3cwolqSQwmgOThOexNHvBFS%0AsNaxpGHD%2BymrDY5ORIdY2ui6gv%2Fvzox%2BZSJDncQe1qie|预订|6c000G60270G|G6027|CWQ|IOQ|IZQ|IOQ|22:19|22:49|00:30|Y|wwwgSToEu0%2FCJo9AVIbbiwCJ2CfmlyySd9hSkqBeW296dPv8YHoutOeWBOw%3D|20180320|3|Q6|05|06|1|0||||||有|无||||18|有|||O0M0O0P0|OMOP|1","|预订|6c000G62250O|G6225|IZQ|IOQ|IZQ|IOQ|22:25|23:01|00:36|N|HTlq8SfEvx%2B5tJAsB0awW8snCsBjszvXsddNksBYzkBaU%2Fa2l8T7%2FWQl%2BT4%3D|20180320|3|Q7|01|03|1|0||||||无|无||||无|无|||O0O0M0P0|OOMP|1","XjTDpYDWO1QUqprc2LXLRWF68Iva7Kc4KvxV7bz3odUw6f8RbRFjIHEp%2BtuUsIozfCs1Mrcae1ue%0AsFx0ghe2jCk2rMD5p%2FQ7tdu734c9zG7wQt2eftJX1S5nSMOFdO%2FzoU5C1znt5IT0CXXa4Ob70mKY%0AJi2%2BsZppav9nOx6xLuI27UixyHcm7MAgqZnm9ImHpWgc6RvPIx3CO1StIcjTs8q382%2BVAt8x01rX%0AdoDu0dx7hsXxvQ1NjKfqKuTMRrJS|预订|65000C717307|C7173|GGQ|SZQ|GGQ|SZQ|22:38|23:54|01:16|Y|MxLY%2FKVPzkfhKIbVOTaUigf3u7veexIvHJob6sZe6Ql2Uloq|20180320|3|Q2|01|06|0|0|||||||有||||有|有|||O0M0O0|OMO|0","|列车停运|65000C706106|C7061|GGQ|SZQ|GGQ|SZQ|24:00|24:00|99:59|IS_TIME_NOT_BUY||20180320||Q2|01|05|0|1|||||||||||||||||0","k20Rtm6vaXkPj48ys232%2F%2FmOyc8YB24KwKhvXLXVJX3yo%2BVHZtnGx6F5DbTNSbaW3IQiXtOyog8j%0AQtuBqaAnpiwKniyqdPCUCPQQN92W5G0M0QxscU0UvkG0Iz9F5QiFwjOy5VxrycVxzvEiXA3INOfz%0A%2BN%2F1ZiFquSfWFBXoqit1oA4hmyi0veE8ptXlMtWmjnRfrp41Yl%2B1GEiRPF4nS1iPmVNz115yY9by%0A5aORuyDOt4v6eFIKMdEDoMuu2vVUhD5TryWstvs%3D|预订|61000G614406|G6141|KAQ|NZQ|IZQ|NZQ|23:08|23:47|00:39|Y|DrwOYi95zJBnbO6yz%2BcKn0E29jvDhpC0618vjl9zG3%2Bos5B1fG3XAa%2BwmCE%3D|20180320|3|Q9|09|10|1|0|||||||无||||有|16|16||O090M0O0|O9MO|1"]},"httpstatus":200,"messages":"","status":true},"info":"获取火车票信息成功！","status":200};
        let tickets = data.data.data.result,
            station = data.data.data.map,
            ticket = [];
        tickets.map((item, index) => {
          let info = item.split("|");
          if(info[1] !== "列车停运") {
            let hasYingZuo = false; // 是否有硬座
            if(info[29]) {
              hasYingZuo = true;
            }
            let json = {
              "train_status" : info[1], // 火车状态
              "train_no" : info[2], // 火车编号
              "train_id" : info[3], // 火车id
              "start_time" : info[8], // 开始时间
              "end_time" : info[9], // 结束时间
              "total_time" : info[10], // 总时间
              "date" : info[13], // 日期
              "ruanwo" : handleTicketNumber(info[23]), // 软卧
              "ruanzuo" : handleTicketNumber(info[24]), // 软座
              "wuzuo" : handleTicketNumber(info[26]), // 无座
              "yingwo" : handleTicketNumber(info[28]), // 硬卧
              "yingzuo" : handleTicketNumber(info[29]), // 硬座
              "scSeat" : handleTicketNumber(info[30]), // 二等座
              "fcSeat" : handleTicketNumber(info[31]), // 一等座
              "bcSeat" : handleTicketNumber(info[32]), // 商务座 / 特等座
              "dongwo" : handleTicketNumber(info[33]), // 动卧
              "start_station_code" : info[6], // 出发站code
              "end_station_code" : info[7], // 终点站code
              "start_station" : station[info[6]], // 出发站
              "end_station" : station[info[7]], // 终点站
              "from_station_no" : info[16], // 出发地车序  查车票价格需要
              "to_station_no" :  info[17], // 到达地车序  查车票价格需要
              "seat_types" : info[35],  //     查车票价格需要
              "hasYingZuo" : hasYingZuo
            };
            json["hasTicket_1"] = handleCheckTicketNumber(json, 'ruanwo', 'bcSeat'); // 是否有余票
            json["hasTicket_2"] = handleCheckTicketNumber(json, 'yingwo', 'fcSeat');
            json["hasTicket_3"] = handleCheckTicketNumber(json, 'yingzuo', 'scSeat');
            json["hasTicket_4"] = handleCheckTicketNumber(json, 'wuzuo', 'wuzuo');
            ticket.push(json);
          }
        });
        this.props.changeTicketsData({
          type: "change_tickets_data",
          data: ticket
        });
    //   }.bind(this)
    // })
  }
  handleBtnBack() {
    // 返回上一页
    this.props.handleRedirect({
      method: this.props.history,
      type: "redirect",
      to: "/ticketSystem/index"
    })
  }
  handleSelectDate() {
    // 跳转选择日期页面
    this.props.handleRedirect({
      method: this.props.history,
      type: "redirect",
      from: "/ticketSystem/ticketList",
      to: "/ticketSystem/calendar"
    })
  }
  handleBeforeDate(boolean) {
    // 选择前一天
    if(boolean) return;

  }
  handleAfterDate() {
    // 选择后一天

  }
  handleSort(type) {
    const { ticketSystem } = this.props;
    let tickets = ticketSystem.tickets;
    let direct = this.state[type] ? this.state[type] == "up" ? "down" : "up" : "up";
    let key = "start_time";
    if(type == "price") {
      key = "price";
    } else if(type == "consuming") {
      key = "total_time";
    }
    if(tickets.length) {
      tickets.sort(sortKey(key, direct));
    }
    this.setState({
      time: "",
      consuming: "",
      price: ""
    });
    this.setState({
      [type] : direct
    })
  }
  render() {
    const { ticketSystem,ajax } = this.props;
    const { time, consuming, price } = this.state;
    let nowDate = moment().format('L');
    let beforeDate = moment(ticketSystem.ticket_date).isBefore(nowDate) || moment(ticketSystem.ticket_date).isSame(nowDate);
    let tickets = ticketSystem.tickets;
    return (
      <div id="tickets_list">
        <header>
          <div className="fixed_style">
            <a href="javascript:void(0);" className="btn_back" onClick={this.handleBtnBack.bind(this)}><img src={icon_23} /></a>
            <p className="title">
              <span>上海</span>
              <i></i>
              <span>北京</span>
            </p>
          </div>
        </header>
        <section>
          <ul className="top_nav">
              <li><span className={beforeDate ? 'before_date gray' : 'before_date'} onClick={this.handleBeforeDate.bind(this, beforeDate)}>前一天</span></li>
            <li>
              <a href="javascript:void(0);" onClick={this.handleSelectDate.bind(this)}>
                {ticketSystem.ticket_date.substr(5,2)}月{ticketSystem.ticket_date.substr(8,2)}日 周{moment(ticketSystem.ticket_date).format("dd")}
                <i></i>
              </a>
            </li>
            <li><span className="next_date" onClick={this.handleAfterDate.bind(this)}>后一天</span></li>
          </ul>
          {
            tickets.map((ticket, index) => {
              return (
                <div className="ticket_list">
                  <ul className="ticket_info">
                    <li><span>{ticket.start_station}</span><span className="number_1">{ticket.start_time}</span></li>
                    <li><span className="small">{ticket.train_id}</span><span className="small">{ticket.total_time}</span></li>
                    <li><span>{ticket.end_station}</span><span className="number_2">{ticket.end_time}</span></li>
                    <li><p className={ticket.train_status == "列车停运" ? "gray" : ""}>{ticket.train_status}</p></li>
                  </ul>
                  <ul className="ticket_seat">
                    <li>
                      <span className={!ticket.hasTicket_1 ? "gray" : ""}>
                        {ticket.hasYingZuo ? "软卧" + ticket.ruanwo + "张" : "特等座" + ticket.bcSeat + "张"}
                        <span className="blue" style={{"display" : ticket.hasTicket_1 ? "none" : "inline"}}>(抢)</span>
                      </span>
                    </li>
                    <li>
                      <span className={!ticket.hasTicket_2 ? "gray" : ""}>
                        {ticket.hasYingZuo ? "硬卧" + ticket.yingwo + "张" : "一等座" + ticket.fcSeat + "张"}
                      </span>
                      <span className="blue" style={{"display" : ticket.hasTicket_2 ? "none" : "inline"}}>(抢)</span>
                    </li>
                    <li>
                      <span className={!ticket.hasTicket_3 ? "gray" : ""}>
                        {ticket.hasYingZuo ? "硬座" + ticket.yingzuo + "张" : "二等座" + ticket.scSeat + "张"}
                      </span>
                      <span className="blue" style={{"display" : ticket.hasTicket_3 ? "none" : "inline"}}>(抢)</span></li>
                    <li>
                      <span className={!ticket.hasTicket_4 ? "gray" : ""}>
                      无座{ticket.wuzuo}张
                      </span>
                      <span className="blue" style={{"display" : ticket.hasTicket_4 ? "none" : "inline"}}>(抢)</span>
                    </li>
                  </ul>
                </div>
              )
            })
          }
          <div className="footer">
            <ul>
              <li><p>筛选</p></li>
              <li className={time ? time == "up" ? "up" : "down" : ""} onClick={this.handleSort.bind(this, "time")}><p>出发<span className="up"> 早-晚</span><span className="down"> 晚-早</span></p></li>
              <li className={consuming ? consuming == "up" ? "up" : "down" : ""} onClick={this.handleSort.bind(this, "consuming")}><p>耗时<span className="up"> 短-长</span><span className="down"> 长-短</span></p></li>
              <li className={price ? price == "up" ? "up" : "down" : ""} onClick={this.handleSort.bind(this, "price")}><p>数量<span className="up"> 少-多</span><span className="down"> 多-少</span></p></li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

/**
* 对票数做处理
*/
function handleTicketNumber(value) {
  if(value) {
    if(value == "无") {
      return 0;
    } else if(value == "有") {
      return 44;
    } else {
      return Number(value);
    }
  } else {
    return 0;
  }
}

/**
* 判断是否有余票
*/
function handleCheckTicketNumber(ticket, key1, key2) {
  if(ticket.hasYingZuo) {
    // 有硬座数据
    if(ticket[key1]) {
      return true;
    } else {
      return false;
    }
  } else {
    if(ticket[key2]) {
      return true;
    } else {
      return false;
    }
  }
}

/**
* 排序
*/
function sortKey(key, dec) {
  return function(a1,a2) {
      if(key == "price") {
        let number1 = a1.ruanwo + a1.ruanzuo + a1.wuzuo + a1.yingwo + a1.yingzuo + a1.scSeat + a1.fcSeat
                    +  a1.bcSeat + a1.dongwo;
        let number2 = a2.ruanwo + a2.ruanzuo + a2.wuzuo + a2.yingwo + a2.yingzuo + a2.scSeat + a2.fcSeat
                    +  a2.bcSeat + a2.dongwo;
        if(number1 > number2) {
          return dec == "up" ? 1 : -1;
        } else if(number1 < number2) {
          return dec == "up" ? -1 : 1;
        } else {
          return 0;
        }
      } else {
        if(a1[key] > a2[key]) {
          return dec == "up" ? 1 : -1;
        } else if(a1[key] < a2[key]) {
          return dec == "up" ? -1 : 1;
        } else {
          return 0;
        }
      }
  }
}

function mapStateToProps(state) {
  const { ticketSystem, ajax } = state;
  return {
    ticketSystem: ticketSystem,
    ajax: ajax
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleRedirect: (action) => dispatch(action),
    handleRedirect: (action) => dispatch(action),
    changeTicketsData: (action) => dispatch(action),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketList);
