---
title: "Spring Boot에서 jOOQ, Gradle, Flyway 설정하기"
category: "Spring"
description: "jOOQ를 설정하고 Flyway와 함께 사용하는 방법"
tags:
  - Spring
  - SpringBoot
  - Java
  - jOOQ
publishedAt: "2024-12-13"
isPublished: true
---

## 1. 왜 jOOQ

JPA는 잘 사용하면 많은 장점이 있다.

하지만, 내 시선에는 JPA의 이점보다 여러 문제들이 보였다.

- N + 1 문제
- fetch join 문제
- 복잡한 쿼리를 위해 JPQL 사용(QueryDSL)
- 방대한 학습량 등

ORM 기술을 사용함으로써 생기는 문제를 해결하는 데 더 많은 시간과 노력이 들어가보인다.

이전 회사에서는 MyBatis를 사용했는데, MyBatis는 Java 코드와 XML 파일을 왔다 갔다 하며 컨텍스트 스위칭이 발생하고, 문자열로 쿼리를 작성하는 개발 경험이 불편했다. 특히 오타로 인해 발생하는 에러는.. 🫠

프로젝트 규모가 커지고 SQL이 복잡해지면, jOOQ가 적합하지 않을까?

> 좀 더 깊이 있는 내용은 카카오 개발자 분의 이야기를 보자.
>
> [모두가 JPA를 외치는 세상에서 jOOQ를 꺼내다.](https://sightstudio.tistory.com/73)

## 2. 시작

`start.spring.io`에서 새 Spirng Boot 프로젝트를 생성한다.

다음 의존성 세가지를 추가해준다.

- `Flyway Migration`
- `JOOQ Access Layer`
- 사용하는 데이터베이스 드라이버

<img alt="의존성 세팅" src="/using-jooq-with-spring-boot/01.png"/>

```gradle
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-jooq'
	implementation 'org.flywaydb:flyway-core'
	implementation 'org.flywaydb:flyway-database-postgresql'
	runtimeOnly 'org.postgresql:postgresql'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}
```

## 3. SQL 작성

`src/main/resources/db/migration`에 `V0.1__init.sql` 마이그레이션 SQL 파일을 작성한다.

```sql
--  V0.0.1__init.sql
CREATE TABLE "author" (
    "id"   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "book" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "author_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    FOREIGN KEY ("author_id") REFERENCES "author" ("id") ON DELETE CASCADE
);
```

## 4. jOOQ code generator

이제 jOOQ code generator를 이용하여 SQL을 읽어 jOOQ 클래스를 생성하는 단계다.

공식문서에 따르면, jOOQ code generator는 ‘데이터베이스 스키마를 기반으로 Java 클래스를 자동으로 생성해주는 도구’다. 데이터베이스 테이블, 레코드, 시퀀스, POJO(Plain Old Java Objects), DAO(Data Access Object), 저장 프로시저 등 다양한 요소들을 모델링하는 Java 클래스를 생성할 수 있다. - [문서](https://www.jooq.org/doc/latest/manual/code-generation/)

jOOQ 3.19부터는 Gradle을 지원하기 시작했다.

이 메모 글에서는 기존 데이터 베이스를 읽는 방법이 아니라 SQL 파일을 읽어 Java 클래스를 생성한다.

### 4.1 플러그인 추가하기

`build.gradle` 파일의 `plugins`에 jOOQ Code Generator 플러그인을 추가한다.

플러그인 버전은 공식문서에서 확인한다. - [https://www.jooq.org/doc/latest/manual/code-generation/codegen-gradle](https://www.jooq.org/doc/latest/manual/code-generation/codegen-gradle/)

```jsx
plugins {
	id 'java'
	id 'org.springframework.boot' version '3.4.0'
	id 'io.spring.dependency-management' version '1.1.6'
	id 'org.jooq.jooq-codegen-gradle' version '3.19.16' // 🔥
}
```

### 4.2 의존성 추가하기

`build.gradle`의 `dependencies`에는 [JOOQ Meta Extensions](https://mvnrepository.com/artifact/org.jooq/jooq-meta-extensions)을 추가한다.

SQL을 읽어 자바 클래스를 생성해주는데 필요하다.

공식문서 - [https://www.jooq.org/doc/latest/manual/code-generation/codegen-ddl](https://www.jooq.org/doc/latest/manual/code-generation/codegen-ddl/)

```gradle
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-jooq'
	implementation 'org.flywaydb:flyway-core'
	implementation 'org.flywaydb:flyway-database-postgresql'
	runtimeOnly 'org.postgresql:postgresql'
	jooqCodegen 'org.jooq:jooq-meta-extensions:3.19.16' // 🔥
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}
```

### 4.3 Codegen 설정 작성하기

jOOQ Code Generator가 SQL을 읽고 Java 클래스를 생성할 수 있도록 `build.gradle`에 다음과 같은 설정을 추가한다.

세부 설정은 필요에 맞게 수정하고, 공식 문서를 참고한다.

공식문서 - https://www.jooq.org/doc/latest/manual/code-generation/codegen-configuration

```gradle
jooq {
	configuration {
		generator {
			database {
				name = 'org.jooq.meta.extensions.ddl.DDLDatabase'  // 4.2에서 SQL을 읽어 클래스 생성하는데 필요
				inputSchema = 'PUBLIC'
				includes = '.*'                        // 모든 테이블 포함
				excludes = 'flyway_schema_history'     // Flyway 마이그레이션 history 테이블은 제외
				properties {
					property {
						key = 'scripts'
						value = 'src/main/resources/db/migration/*.sql' // SQL 파일 위치
					}
					property {
						key = 'sort'
						value = 'flyway'
					}
				}
			}
			target {
				packageName = 'com.example.jooq'      // 해당 패키지에 jOOQ 클래스들이 생성된다
				directory = 'src/main/java'
			}
			strategy {
				matchers {
					tables {
						table {
							tableClass {
								transform = "PASCAL"
								expression = 'J_$0'          // 생성되는 jOOQ 클래스에 J 접두사가 생긴다.
							}
						}
					}
				}
			}
		}
	}
}
```

## 5. application.\* 작성하기

`application.properties` 또는 `application.yaml`에 Flyway 활성화와 DB 연결 정보를 작성한다.

```yaml
spring:
  application:
    name: demo
  flyway:
    enabled: true
  datasource:
    url: jdbc:postgresql://localhost:5432/postgres
    username:
    password:

logging:
  level:
    # jOOQ 쿼리 로깅
    org.jooq.tools.LoggerListener: DEBUG
```

## 6. jooqCodegen 실행해보기

설정이 완료되었으면, 터미널에서 다음 명령어를 실행하여 jOOQ Code Generator를 실행한다.

```bash
./gradlew jooqCodegen
```

<img alt="jooqCodegen 실행" src="/images/using-jooq-with-spring-boot/02.png"/>

또는 인텔리제이를 사용한다면 Gradle GUI로 jooCodgen을 실행할 수 있다.

<img alt="Gradle GUI" src="/images/using-jooq-with-spring-boot/03.png"/>

### 6.1 생성된 클래스 확인

`jooq` 패키지와 함께 Java 클래스 파일들이 생성되었는지 확인한다.

<img alt="생성된 클래스 확인" src="/images/using-jooq-with-spring-boot/04.png"/>

### 6.2 Flyway 마이그레이션 실행

스프링 애플리케이션을 실행하여 Flyway 마이그레이션을 실행 후 테이블이 생성되었는지 확인한다.

<img alt="Flyway 마이그레이션 실행후 테이블" src="/images/using-jooq-with-spring-boot/05.png"/>

## 7. 맛보기

쿼리 지향적 코드로부터 벗어나기 위해 테이블과 상관없는 도메인 POJO 클래스를 작성했다고 가정한다.

```java
public class Author {
    private Long id;
    private String name;
    // 생성자, Getter 생략
}

```

```java
public class Book {
    private Long id;
    private Long authorId;
    private String title;
    // 생성자, Getter 생략
}
```

`insertInto` 메서드를 사용하여 `AUTHOR` 테이블에 `NAME` 컬럼만 삽입하는 예시다. 삽입된 결과는 `returning()`을 통해 반환되며, 반환된 데이터는 `Author` 객체로 매핑된다.

공식문서 - https://www.jooq.org/doc/latest/manual/sql-building/sql-statements/insert-statement/

```java
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import static com.example.jooq.Tables.AUTHOR;

@Repository
public class AuthorRepository {
    private final DSLContext dsl;

    public AuthorRepository(DSLContext dsl) {
        this.dsl = dsl;
    }

    public Author save(Author author) {
        return dsl
            .insertInto(AUTHOR, AUTHOR.NAME)
            .values(author.getName())
            .returning()
            .fetchOneInto(Author.class);
    }
}
```

`values()`로 값을 설정하는 대신, `set()`을 사용할 수도 있다. `values()` 보다 코드의 가독성을 높이고, 컬럼 수가 많을 때 사용할 수 있다.

```java
    public Author save(Author author) {
        return dsl
            .insertInto(AUTHOR)
            .set(AUTHOR.NAME, author.getName()) // 🔥
            .returning()
            .fetchOneInto(Author.class);
    }
```

`returning()`은 삽입된 모든 필드를 반환한다. 필요한 필드만 반환하려면 `returningResult()`를 사용하면 된다. 예를 들어, `ID`만 반환하고 싶다면 :

```java
    public Long save(Author author) {
        return dsl
            .insertInto(AUTHOR)
            .set(AUTHOR.NAME, author.getName())
            .returningResult(AUTHOR.ID)
            .fetchOneInto(Long.class);
    }
```

테이블과 대응하는 엔티티 클래스가 있다면 이런식으로 반환하는 것도 방법인 듯

```java
    public Long save(Author author) {
        AuthorEntity entity = dsl
            .insertInto(AUTHOR)
            .set(AUTHOR.NAME, author.getName())
            .returning()
            .fetchOneInto(AuthorEntity.class);

        return entity.toAuthor();
    }
```

### 테스트 코드로 확인

```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AuthorRepositoryTest {
    @Autowired
    private AuthorRepository authorRepository;

    @Test
    void saveTest() {
        Author author = new Author("생택쥐페리");

        Author savedAuthor = authorRepository.save(author);

        assertNotNull(savedAuthor);
        assertEquals(author.getName(), savedAuthor.getName());
    }
}
```

<img alt="테스트 코드 실행" src="/images/using-jooq-with-spring-boot/06.png"/>

## 8. 마무리

jOOQ는 SQL을 Java 코드로 작성할 수 있는 라이브러리. SQL 쿼리를 타입 안전하게 작성해보자.
