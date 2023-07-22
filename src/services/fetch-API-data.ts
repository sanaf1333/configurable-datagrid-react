import { JSONPath } from "jsonpath-plus";
import axios from 'axios';
import { dataArray } from "../types/data-array";

interface FetchAPIDataProps{
    APIURL: string;
    columns: dataArray[];
}

const FetchAPIData = async ({APIURL, columns}: FetchAPIDataProps) => {
    try {
        const response = await axios.get(APIURL);
        const data = response.data;
        const processedData: Record<string, any[]> = {};
        
        columns.forEach(({ key }) => {
            const jsonPathQuery = `$..${key}`; // JSONPath query for extracting data based on the key
            const extractedData = JSONPath({ json: data, path: jsonPathQuery }) || []; // Use JSONPath to extract data

            // Store the extracted data for the current key in the processedData object
            processedData[key] = extractedData;
        });
        
        return processedData; // Return the processed data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
 
export default FetchAPIData;