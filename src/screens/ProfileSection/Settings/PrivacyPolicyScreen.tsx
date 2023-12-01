import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { styles } from "../../../utils/AppStyles"
import { fontFamilty } from "../../../utils/Fonts"
import { colors } from "../../../utils/AppColors"
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react"
import { AppString } from "../../../utils/AppStrings"

const PrivacyPolicyScreen = ({ navigation }) => {

    useEffect(() => {

        navigation.setOptions({
            headerTitle: AppString.privacy_policy,

            headerRight: (() => <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons name="ellipsis-horizontal-outline" size={24} />
            </TouchableOpacity>),

            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={{ alignItems: "center" }}>
                    <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
            )

        })
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container} >
                <Text style={[styles.textStyle, { fontFamily: fontFamilty.bold, color: "#2649AA", fontSize: 20, paddingBottom: 16, textAlign: "center" }]}>
                    Политика конфиденциальности {'\n'} Jumunona
                </Text>
                <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 13 }} >
                    <Text style={[styles.textStyle, { color: "#666666", fontSize: 14 }]}>
                        Политика конфиденциальности персональной информации (далее – «Политика») действует в отношении всей информации, которую ООО «Jumunona» (далее – «Общество»), могут получить о Пользователе во время использования мобилного приложения  Jumunona, и в ходе исполнения любых соглашений и договоров с Пользователем. Согласие Пользователя с Политикой, выраженное им в рамках отношений с Обществом.{'\n'}
                        {'\n'}
                        Использование Сервиса означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации;{'\n'}
                        в случае несогласия с этими условиями Пользователь должен воздержаться от использования Сервиса.{'\n'}
                        Обработка персональных данных пользователя, не указанных в настоящей Политике, также регулируется политикой обработки персональных данных.{'\n'}
                        {'\n'}
                        1.ПЕРСОНАЛЬНАЯ ИНФОРМАЦИЯ ПОЛЬЗОВАТЕЛЕЙ, КОТОРУЮ ОБРАБАТЫВАЕТ ОБЩЕСТВО{'\n'}
                        1.1.В рамках настоящей Политики под «персональной информацией Пользователя» понимаются:{'\n'}
                        1.1.1.Персональная информация, которую Пользователь предоставляет о себе самостоятельно при регистрации (создании учётной записи) или в процессе использования Сервиса, включая персональные данные Пользователя. Обязательная для предоставления Сервиса информация помечена специальным образом. Иная информация предоставляется Пользователем на его усмотрение.{'\n'}
                        1.1.2.Данные, которые автоматически передаются Сервисам Общество в процессе их использования с помощью установленного на устройстве Пользователя программного обеспечения, в том числе IP-адрес, данные файлов cookie, информация о браузере Пользователя (или иной программе, с помощью которой осуществляется доступ к Сервисам), технические характеристики оборудования и программного обеспечения, используемых Пользователем, дата и время доступа к Сервису, адреса запрашиваемых страниц и иная подобная информация.{'\n'}
                        1.1.3.Иная информация о Пользователе, обработка которой предусмотрена условиями использования отдельных Сервисов Общество{'\n'}
                        1.2. Настоящая Политика применима только к информации, обрабатываемой в ходе использования Сервиса Общество. Общество не контролирует и не несет ответственность за обработку информации сайтами третьих лиц, на которые Пользователь может перейти по ссылкам, доступным на приложениях Общество, в том числе в результатах поиска.{'\n'}
                        1.3. Общество исходит из того, что Пользователь предоставляет достоверную и достаточную персональную информацию и поддерживает эту информацию в актуальном состоянии. Последствия предоставления недостоверной или недостаточной информации определены в Лицензионном соглашении для использования приложения.{'\n'}
                        {'\n'}
                        2.ЦЕЛИ ОБРАБОТКИ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЕЙ:{'\n'}
                        2.1. Общество собирает и хранит только ту персональную информацию, которая необходима для предоставления Сервиса или исполнения соглашений и договоров с Пользователем, за исключением случаев, когда законодательством РТ предусмотрено обязательное хранение персональной информации в течение определенного законом срока.{'\n'}
                        2.2. Персональную информацию Пользователя Общество обрабатывает в следующих целях:{'\n'}
                        2.2.1. Идентификация стороны в рамках Сервиса, соглашений и договоров с Общество;{'\n'}
                        2.2.2.Предоставление Пользователю персонализированных Сервисов и исполнение соглашений и договоров;{'\n'}
                        2.2.3.Связь с Пользователем, в том числе направление уведомлений, запросов и информации, касающихся использования Сервисов, исполнения соглашений и договоров, а также обработка запросов и заявок от Пользователя;{'\n'}
                        2.2.4.Улучшение качества Сервиса, удобства их использования, разработка новых Сервисов;{'\n'}
                        2.2.5.Проведение статистических и иных исследований на основе обезличенных данных.{'\n'}
                        {'\n'}
                        3.УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЕЙ И ЕЁ ПЕРЕДАЧИ ТРЕТЬИМ ЛИЦАМ{'\n'}
                        3.1.Общество хранит персональную информацию Пользователей в соответствии с внутренними регламентами сервисов.{'\n'}
                        3.2.В отношении персональной информации Пользователя сохраняется ее конфиденциальность, кроме случаев добровольного предоставления Пользователем информации о себе для общего доступа неограниченному кругу лиц. При использовании отдельных Сервисов, Пользователь соглашается с тем, что определённая часть его персональной информации становится общедоступной.{'\n'}
                        3.3.Общество вправе передать персональную информацию Пользователя третьим лицам в следующих случаях:{'\n'}
                        3.3.1.Пользователь выразил согласие на такие действия;{'\n'}
                        3.3.2.Передача необходима для использования Пользователем определенного Сервиса либо для исполнения определенного соглашения или договора с Пользователем, в том числе для обработки на условиях и для целей, связанных с проведением транзакций Банками в связи с Заказами Пользователя;{'\n'}
                        3.3.3.Передача предусмотрена законадательством РТ или иным применимым законодательством и в рамках установленной законодательством процедуры;{'\n'}
                        3.3.4.Такая передача происходит в рамках продажи или иной передачи бизнеса (полностью или в части), при этом к приобретателю переходят все обязательства по соблюдению условий настоящей Политики применительно к полученной им персональной информации;{'\n'}
                        3.3.5.В целях обеспечения возможности защиты прав и законных интересов Общество или третьих лиц в случаях, когда Пользователь нарушает Лицензионное соглашения для использования приложения Общество, настоящую Политику, либо документы, содержащие условия использования конкретных Сервисов.{'\n'}
                        3.3.6.В результате обработки персональной информации Пользователя путем ее обезличивания получены обезличенные статистические данные, которые передаются третьему лицу для проведения исследований, выполнения работ или оказания услуг по поручению Общество.{'\n'}
                        3.4.При обработке персональных данных Пользователей Общество руководствуется законом Республики Таджикистана «О защите персональных данных».{'\n'}
                        {'\n'}
                        4.ИЗМЕНЕНИЕ И УДАЛЕНИЕ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ. ОБЯЗАТЕЛЬНОЕ ХРАНЕНИЕ ДАННЫХ{'\n'}
                        4.1.Пользователь может в любой момент изменить (обновить, дополнить) предоставленную им персональную информацию или её часть, воспользовавшись функцией редактирования персональных данных в Личном кабинете.{'\n'}
                        4.2.Пользователь также может удалить предоставленную им в рамках определенного Личного кабинета персональную информацию, воспользовавшись функцией «Удалить Личный кабинет».{'\n'}
                        4.3.Права, предусмотренные пп. 4.1. и 4.2. настоящей Политики могут быть ограничены в соответствии с требованиями законодательства. В частности, такие ограничения могут предусматривать обязанность Общество сохранить измененную или удаленную Пользователем информацию на срок, установленный законодательством, и передать такую информацию в соответствии с законодательно установленной процедурой государственному органу.{'\n'}
                        {'\n'}
                        5.МЕРЫ, ПРИМЕНЯЕМЫЕ ДЛЯ ЗАЩИТЫ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ{'\n'}
                        5.1.Общество принимает необходимые и достаточные организационные и технические меры для защиты персональной информации Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий с ней третьих лиц.{'\n'}
                        {'\n'}
                        6.ИЗМЕНЕНИЕ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ. ПРИМЕНИМОЕ ЗАКОНОДАТЕЛЬСТВО{'\n'}
                        6.1.Общество имеет право вносить изменения в настоящую Политику конфиденциальности. При внесении изменений в актуальной редакции указывается дата последнего обновления. Новая редакция Политики вступает в силу с момента ее размещения, если иное не предусмотрено новой редакцией Политики.{'\n'}
                        6.2.К настоящей Политике и отношениям между Пользователем и Общество, возникающим в связи с применением Политики конфиденциальности, подлежит применению право Республики Таджикистана.                   </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default PrivacyPolicyScreen