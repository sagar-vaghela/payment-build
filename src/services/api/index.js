import axios from "axios";
import { createAxiosFor } from "../axios";


export const getTableRunConfigQAM = () => {
  return createAxiosFor.get('/downstream_qams/running')
};

export const getTableRunConfigQAMSingle = (ch_id) => {
  return createAxiosFor.get(`/downstream_qams_single/running?ch_id=${ch_id}`)
};

export const getRCQAMUpdateTableRow = (ch_id, payload) => {
  return createAxiosFor.post(`/downstream_qams_single/running/update?ch_id=${ch_id}`, payload)
};

export const getRCQAMAddTableRow = (payload) => {
  return createAxiosFor.post(`/downstream_qams_single/running/create`, payload)
};

export const getRCQAMDeleteTableRow = (ch_id) => {
  return createAxiosFor.post(`/downstream_qams_single/running/delete?ch_id=${ch_id}`)
};

export const postSaveAsAPI = (dbname, filename) => {
  return createAxiosFor.post(`/downstream_config/copy?from_db=${dbname}&to_db=${filename}`);
};

export const makeDefaultAPI = () => {
  return createAxiosFor.post(`/downstream_config/startup/`);
};

export const getTableManageConfigQAM = (db_default_type) => {
  return createAxiosFor.get(`/downstream_config?db_default_type=${db_default_type}`)
}

export const postNewDataBaseAPI = (name) => {
  return createAxiosFor.post(`/downstream_config/new?dbname=${name}`);
};

export const addRangeConfiguration = (dbname, payload) => {
  return createAxiosFor.post(`/downstream_qams_single/create?dbname=${dbname}`, payload)
};

export const systemSettingsSplit = (split) => {
  return createAxiosFor.post(`/downstream_config_setting/split?split=${split}`);
};

export const systemSettingsAnnex = (annex) => {
  return createAxiosFor.post(`/downstream_config_setting/annex?annex=${annex}`);
};

export const getSystemSettingsSplitData = () => {
  return createAxiosFor.get('/downstream_config_setting/split')
};

export const getSystemSettingsAnnexData = () => {
  return createAxiosFor.get('/downstream_config_setting/annex')
};

export const getMangeConfigRowAPI = (dbname, db_default_type) => {
  return createAxiosFor.get(`/downstream_qams?dbname=${dbname}&db_default_type=${db_default_type}`)
};

export const deleteConfiguration = (dbname, ch_id) => {
  return createAxiosFor.post(`/downstream_qams_single/delete?dbname=${dbname}&ch_id=${ch_id}`)
};

export const renameDbName = (dbname, copyname) => {
  return createAxiosFor.post(`/downstream_config/copy?from_db=${dbname}&to_db=${copyname}`)
};

export const deleteRenameConfig = (dbname) => {
  return createAxiosFor.post(`/downstream_config/delete?dbname=${dbname}`)
};

export const configSingleQAMTableData = (dbname, ch_id) => {
  return createAxiosFor.get(`/downstream_qams_single?dbname=${dbname}&db_default_type=0&ch_id=${ch_id}`)
};

export const deleteDataBase = (dbname) => {
  return createAxiosFor.post(`/downstream_config/delete?dbname=${dbname}`)
};

export const archiveDataBase = (dbname) => {
  return createAxiosFor.post(`/downstream_config/archive?dbname=${dbname}`)
};

export const runDataBase = (dbname) => {
  return createAxiosFor.post(`/downstream_config/load?dbname=${dbname}`)
};

export const downloadAllDataBase = () => {
  return createAxiosFor.post(`/downstream_config/download`)
};

export const updateConfiguration = (dbname, ch_id, payload) => {
  return createAxiosFor.post(`/downstream_qams_single/update?dbname=${dbname}&ch_id=${ch_id}`, payload)
};

export const drcQAMDeleteAllTableRow = () => {
  return createAxiosFor.post(`downstream_qams/running/delete_all`)
};

export const getManageConfigAnnex = (db_default_type, dbname) => {
  return createAxiosFor.get(`/downstream_config/annex?db_default_type=${db_default_type}&dbname=${dbname}`)
};

export const addTiltConfiguration = (start_freq, end_freq, start_power, end_power, dbname) => {
  return createAxiosFor.post(`/downstream_qams/tilt?start_freq=${start_freq}&end_freq=${end_freq}&start_power=${start_power}&end_power=${end_power}&dbname=${dbname}`)
};

export const allDeleteConfiguration = (dbname) => {
  return createAxiosFor.post(`/downstream_qams/delete_all?dbname=${dbname}`)
};
