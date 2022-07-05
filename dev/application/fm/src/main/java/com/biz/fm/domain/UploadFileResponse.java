package com.biz.fm.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UploadFileResponse {
	private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private Long size;
}
