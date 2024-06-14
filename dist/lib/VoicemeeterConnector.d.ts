import { Device, VoiceMeeterTypes } from "../types/VoicemeeterTypes";
import { BusProperties, StripProperties } from "./VoicemeeterConsts";
export default class Voicemeeter {
    /**
     * Initializes the voice meeter dll connection.
     * This call is neccessary to use the api. It returns a promise with a VoiceMeeter instance
     */
    static init(): Promise<Voicemeeter>;
    private isInitialised;
    private isConnected;
    private outputDevices;
    private inputDevices;
    private version;
    private type;
    private eventPool;
    private stringParameters;
    /**
     * Starts a connection to VoiceMeeter
     */
    connect: () => void;
    /**
     * Getter $outputDevices
     * @return {Device[] }
     */
    get $outputDevices(): Device[];
    /**
     * Getter $inputDevices
     * @return {Device[] }
     */
    get $inputDevices(): Device[];
    /**
     * Getter $version
     * @return {string }
     */
    get $version(): string;
    /**
     * Getter $type
     * @return {VoiceMeeterTypes}
     */
    get $type(): VoiceMeeterTypes;
    /**
     * Terminates the connection to VoiceMeeter
     */
    disconnect: () => void;
    /**
     * Updates all input and ouput devices
     */
    updateDeviceList: () => void;
    /**
     * Returns wheter a parameter has been changed
     */
    isParametersDirty: () => any;
    /**
     * Gets a bus parameter.
     * @param  {number} index Index of the bus
     * @param  {BusProperties} property Property which should be get
     */
    getBusParameter: (index: number, property: BusProperties) => any;
    /**
     * Gets a strip parameter
     * @param  {number} index Index of the strip
     * @param  {StripProperties} property Property which should be get
     */
    getStripParameter: (index: number, property: StripProperties) => any;
    /**
     * Sets a parameter of a strip.
     * @param  {number} index Strip number
     * @param  {StripProperties} property Propertyname which should be changed
     * @param  {any} value Property value
     */
    setStripParameter: (index: number, property: StripProperties, value: any) => Promise<any>;
    /**
     * Sets a parameter of a bus.
     * @param  {number} index Bus number
     * @param  {StripProperties} property Propertyname which should be changed
     * @param  {any} value Property value
     */
    setBusParameter: (index: number, property: BusProperties, value: any) => Promise<any>;
    /**
     * @param  {()=>any} fn Function which should be called if something changes
     */
    attachChangeEvent: (fn: () => any) => void;
    /**
     * @param parameterName Name of the parameter that should be get
     * @returns {any} Parameter value
     */
    getOption: (parameterName: string) => any;
    /**
     * Sets an option.
     * @param {string} option Option to set
     */
    setOption: (option: string) => Promise<unknown>;
    /**
     * Checks whether properties has been changed and calls all event listeners
     */
    private checkPropertyChange;
    /**
     * Gets installed voicemeeter type.
     * Means Voicemeeter(normal,banana,potato)
     */
    private getVoicemeeterType;
    /**
     * Returns the installed voicemeeter version
     */
    private getVoicemeeterVersion;
    /**
     * Gets a parameter of voicemeeter
     * @param  {'Strip'|'Bus'} selector Strip or Bus
     * @param  {number} index Number of strip or bus
     * @param  {StripProperties|BusProperties} property Property which should be read
     */
    private getParameter;
    /**
     * Sets a parameter of a bus or Strip
     * @param  {'Strip'|'Bus'} selector
     * @param  {number} index Number of strip or bus
     * @param  {StripProperties|BusProperties} property Propertyname which should be changed
     * @param  {any} value Property value
     */
    private setParameter;
    /**
     * Gets realtime audio level see the VoicemeeterRemote API: [VoicemeeterRemote.h GetLevel](https://github.com/mirror/equalizerapo/blob/7aece1b788fce5aa11873f3842a0d01f7c78454b/VoicemeeterClient/VoicemeeterRemote.h#L284),
     * for more details about the parameters
     * @param {0|1|2|3} type 0 = pre fader input levels. 1 = post fader input levels. 2= post Mute input levels. 3= output levels
     * @param channel audio channel zero based index
     * @returns {float} Current audio level
     */
    getLevel: (type: 0 | 1 | 2 | 3, channel: number) => unknown;
}
